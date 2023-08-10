---
layout: post
title: "Parsing JSON using the Requests Python library"
date: 2023-08-10 15:11:42 -0700
categories: til
---

# Parsing JSON using the Requests Python library

The [Requests](https://requests.readthedocs.io/en/latest/) library can parse out JSON `key:value` pairs. It's fairly simple so lets go through it.

## Make the GET request

This does assume that Requests is already installed using `pip install requests`.

1. Import `requests`.
2. Put your URL into a variable. This just makes calling it more readable later on.
3. Set up the following Python dicts: `payload` and `headers`.

Example:
```python
import requests

url = "https://api.github.com/repos/octocat/Hello-World"

payload = {}

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    # Not using an API key in this example due to a public API endpoint.
    #"Authorization": f"{API_KEY}"
}
```
Note: If the API you're trying to talk to requires an API key (most do) then use `"Authorization": "API_KEY"`.

Note 2: NEVER put the actual API key in code, call it from an environment variable or other secure method.

## Call the API

1. Next we'll make a new variable and store the returned value of `requets.get()` passing in the `url`, `headers`, and `payload` variables we created earlier.
2. We'll put this response into a new variable as JSON.
2. We can print the response to get a blob of JSON shown in example 2 of this section.

Example 1:
```python
# 1
response = requests.get(url, headers=headers, data=payload)

# 2
response_data = response.json()

# 3
print(response_data)
```

Example 2 (truncated JSON):
```json
{'id': 1296269, 'node_id': 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5', 'name': 'Hello-World'},
```

## Parsing the JSON

This part is fairly simple but can be more complex as the JSON becomes more complex. This is a very straight forward example.

We'll be parsing the JSON from the URL (and in Example 2 above) to get the name of a repo.

1. Create a new variable, maybe named after the JSON key we're getting the value for. Use `.get("")` on the `response_data` variable and pass in the `key` for the `value` that you want. Remember, this is looking for a `key:value` pair.
2. Print the value.

This outputs the name of the repo _Hello-World_. We put the output in an f-string just to fancy it up.

Example:
```python
# 1
repo_name = response_data.get("name")

#2
print(f"Repo name: {repo_name}")

# Output: Repo name: Hello-World
```

# Full code example
```python
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
```