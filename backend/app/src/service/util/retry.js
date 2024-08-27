export default function retry(fn, retries = 3, delay = 1000) {
    return new Promise(async (resolve, reject) => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const result = await fn();
          return resolve(result); // If successful, resolve the promise with the result
        } catch (error) {
          console.error(`Attempt ${attempt} failed: ${error.message}`);
          if (attempt === retries) {
            return reject(error); // If last attempt, reject the promise with the error
          }
          await new Promise(res => setTimeout(res, delay)); // Wait for delay before retrying
        }
      }
    });
  }
  