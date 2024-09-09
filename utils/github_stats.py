from ghapi.all import GhApi
from os import getenv
from dotenv import load_dotenv

load_dotenv()

USERNAME = getenv("GITHUB_USERNAME") or "blacksmithop"

api = GhApi()


def get_github_projects():
    repos = []
    # TODO Filter out response
    # Return only necessary properties
    for i in range(1, 4):
        result = api.repos.list_for_user(username=USERNAME, per_page=100, page=i)
        result = list(result)  # fastcore.foundation.L -> List
        result_len = len(result)
        print(f"Found {result_len} repos on page {i}")
        if result_len:
            repos.extend(result)
        else:
            break

def get_profile_data():
    return api.users.get_by_username("blacksmithop")