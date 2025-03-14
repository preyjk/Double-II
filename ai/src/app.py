import json
import urllib.parse
import urllib.request
import re

BASE_URL = "https://api.gpbooking.icu"

def lambda_handler(event, context):
    print('input: {}'.format(json.dumps(event)))
    agent = event['agent']
    actionGroup = event['actionGroup']
    apiPath = event['apiPath']
    httpMethod = event['httpMethod']
    parameters = event.get('parameters', [])
    requestBodyContent = event.get('requestBody', {}).get('content', {}).get('application/json', {}).get('properties', [])

    # Extract parameters into a dictionary
    params_dict = {param['name'][2:] if param['name'].startswith('s_') else param['name']: param['value'] for param in parameters}

    # Extract request body properties into a dictionary
    requestBody_dict = {prop['name'][2:] if prop['name'].startswith('s_') else prop['name']: prop['value'] for prop in requestBodyContent}

    # Replace placeholders in apiPath with values from params_dict
    converted_apiPath = re.sub(r'\{(\w+)\}', lambda match: params_dict.get(match.group(1), match.group(0)), apiPath)

    url = f"{BASE_URL}{converted_apiPath}"
    
    headers = {'Content-Type': 'application/json'}
    
    # Check for x-access-token in parameters or request body
    access_token = params_dict.get('x_access_token') or requestBody_dict.get('x_access_token')
    if access_token:
        headers['Authorization'] = f"Bearer {access_token}"

    # Convert parameters to a query string for GET and DELETE requests
    if httpMethod in ["GET", "DELETE"] and params_dict:
        query_string = urllib.parse.urlencode(params_dict)
        url = f"{url}?{query_string}"
    
    try:
        if httpMethod == "GET":
            req = urllib.request.Request(url, headers=headers, method='GET')
        elif httpMethod == "POST":
            req = urllib.request.Request(url, data=json.dumps(requestBody_dict).encode(), headers=headers, method='POST')
        elif httpMethod == "PUT":
            req = urllib.request.Request(url, data=json.dumps(requestBody_dict).encode(), headers=headers, method='PUT')
        elif httpMethod == "DELETE":
            req = urllib.request.Request(url, headers=headers, method='DELETE')
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Unsupported HTTP method'})
            }

        with urllib.request.urlopen(req) as response:
            response_data = response.read().decode()
            status_code = response.getcode()

    except urllib.error.HTTPError as e:
        status_code = e.code
        response_data = e.read().decode()
    
    if response_data:
        body = json.loads(response_data)
    responseBody = {
        "application/json": {
            "body": body if response_data else "No Content"
        }
    }

    action_response = {
        'actionGroup': actionGroup,
        'apiPath': apiPath,
        'httpMethod': httpMethod,
        'httpStatusCode': status_code,
        'responseBody': responseBody
    }

    api_response = {'response': action_response, 'messageVersion': event['messageVersion']}
    print("Response: {}".format(api_response))

    return api_response
