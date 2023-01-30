from django.urls import path
from  . import views
urlpatterns = [
    path('index/', views.index,name='index'),
    path('employee/',views.employee,name='employee'),
    path('searchemployee/',views.searchemployee,name='searchemployee'),
    path('viewEmployee/',views.viewEmployee,name='viewEmployee'),
    path('DeleteView/<str:pk>/',views.DeleteView,name='DeleteView'),
    path('detailpage/<str:pk>/',views.detailpage,name='detailpage'),
    path('UpdateView/<str:pk>/',views.UpdateView,name='UpdateView'),
    path('viewALL/',views.viewALL,name='viewALL')
]
