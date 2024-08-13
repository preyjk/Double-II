import json
import urllib.parse
import urllib.request

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
    params_dict = {param['name']: param['value'] for param in parameters}

    # Extract request body properties into a dictionary
    requestBody_dict = {prop['name']: prop['value'] for prop in requestBodyContent}

    url = f"{BASE_URL}{apiPath}"
    
    # Convert parameters to a query string for GET and DELETE requests
    if httpMethod in ["GET", "DELETE"] and params_dict:
        query_string = urllib.parse.urlencode(params_dict)
        url = f"{url}?{query_string}"
    
    try:
        if httpMethod == "GET":
            req = urllib.request.Request(url, method='GET')
        elif httpMethod == "POST":
            req = urllib.request.Request(url, data=json.dumps(requestBody_dict).encode(), headers={'Content-Type': 'application/json'}, method='POST')
        elif httpMethod == "PUT":
            req = urllib.request.Request(url, data=json.dumps(requestBody_dict).encode(), headers={'Content-Type': 'application/json'}, method='PUT')
        elif httpMethod == "DELETE":
            req = urllib.request.Request(url, method='DELETE')
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

    responseBody = {
        "application/json": {
            "body": json.loads(response_data) if response_data else "No Content"
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
