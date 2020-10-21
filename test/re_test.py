import re

regrex = "^(https?:\/\/)?([a-zA-Z0-9\.-]+)\.([a-z\.]{2,6})"
url = "/vi/tutorials/8-regular-expressions-you-should-know--net-6149"
match_search = re.search(regrex,url)
print(match_search)