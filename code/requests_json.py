"""
Parsing JSON using the requests library.

1. Makes a very simple call to the GitHub repos API
2. Uses the requests library to call the API
3. Turns the response into JSON using the Requests library
4. Searches for the key "name" and prints the value.

"""

import requests

def main():

    url = "https://api.github.com/repos/octocat/Hello-World"

    payload = {}

    headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",

            # Not using an API key in this example due to a public API endpoint.
            #"Authorization": f"{API_KEY}"
    }

    response = requests.get(url, headers=headers, data=payload)

    response_data = response.json()

    repo_name = response_data.get("name")

    print(f"Repo name: {repo_name}")


if __name__ == "__main__":
    main()

