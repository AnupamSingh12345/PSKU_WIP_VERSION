from django.urls import path

from pskuapp import views

urlpatterns = [
    path('CountryFetch/', views.CountryFetch),
    path('ChannelFetch/', views.ChannelFetch),
    path('CategoryFetch/', views.CategoryFetch),
    path('BrandFetch/', views.BrandFetch),
    path('DataFetch/', views.DataFetch),
    path('UpdatePSKU/', views.UpdatePSKU),
    path('UpdateTargetWD/', views.UpdateTargetWD),
]
