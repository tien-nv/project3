from django.http import JsonResponse
from django.core import serializers

from model_ai import check_website_adult


def getUrlFromUser(request):
    # request should be ajax and method should be GET.
    if request.method == "GET":
        # get the nick name from the client side.
        user_url = request.GET.get("url", 'not have any url')
        # print(user_url)
        is_adult = check_website_adult.check_image(user_url);
        # print(is_adult)
        # is_adult = True
    return JsonResponse({"data":is_adult}, status = 200)