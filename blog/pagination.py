from rest_framework.pagination import PageNumberPagination


class UsersSuggestionPaginatin(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class MessagesPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'



    



