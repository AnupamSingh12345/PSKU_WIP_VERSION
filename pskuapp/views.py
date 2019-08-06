import json

from django.core.serializers.json import DjangoJSONEncoder
from django.db import connection
from django.http import HttpResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from pskuproject.decorators import is_valid_session
from pskuapp.models import AmaPskuMapping
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required



def check_session(request):
    if not request.session:
        return 401

@is_valid_session
def CountryFetch(request):
        queryset = AmaPskuMapping.objects.values('mkt_cntry_name').distinct().exclude(mkt_cntry_name="")
        session_code = check_session(request)
        return HttpResponse(json.dumps({'CountryList': list(queryset)}), status=session_code,
                            content_type='application/json')

    


@is_valid_session
@csrf_exempt
def ChannelFetch(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        country = data['SelectedCountry']
        queryset = AmaPskuMapping.objects.values('mkt_name').distinct().filter(mkt_cntry_name=country)
        print(list(queryset))
        session_code = check_session(request)
        return HttpResponse(json.dumps({'ChannelList': list(queryset)}), status=session_code,
                            content_type='application/json')


@is_valid_session
@csrf_exempt
def CategoryFetch(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        channel = data['SelectedChannel']
        queryset = AmaPskuMapping.objects.values('level1').distinct().filter(mkt_name=channel)
        print(list(queryset))
        session_code = check_session(request)
        return HttpResponse(json.dumps({'CategoryList': list(queryset)}), status=session_code,
                            content_type='application/json')




@is_valid_session
@csrf_exempt
def BrandFetch(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        category = data['SelectedCategory']
        queryset = AmaPskuMapping.objects.values('brand').distinct().filter(level1=category)
        print(list(queryset))
        session_code = check_session(request)
        return HttpResponse(json.dumps({'BrandList': list(queryset)}), status=session_code,
                            content_type='application/json')


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]



@is_valid_session
@csrf_exempt
def DataFetch(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        country = data['country']
        category = data['category']
        channel = data['channel']
        brand = data['brand']
        # columns=['psku_id','mkt_cntry_name','mkt_name','level1','brand','prod_name','sales_musd_amt',
		# 'wgt_dist_pct','numrc_dist_pct','power_or_not','target_wd']
        # import pandas as pd
        cursor = connection.cursor()
        cursor.execute(
            "select psku_id,mkt_cntry_name,mkt_name,level1,brand,prod_name,round(sales_musd_amt,2) as sales_musd_amt,"
			"power_flag,round(wgt_dist_pct,2) as wgt_dist_pct,round(numrc_dist_pct,2) as numrc_dist_pct, "
			"round(wd_target,2) as target_wd from AMA_PSKU_MAPPING where mkt_cntry_name = %s and mkt_name = %s and "
			"level1 = %s and brand = %s",
            [country, channel, category, brand])
        # query="select psku_id,mkt_cntry_name,mkt_name,level1,brand,prod_name,sales_musd_amt,wgt_dist_pct,
		# numrc_dist_pct,target_wd from PSKU_SIMULATOR_DATA where mkt_cntry_name = '%s' and mkt_name = '%s' and level1
		# = '%s' and brand = '%s'"%(country, channel,category,brand)

        queryset = dictfetchall(cursor)
        # queryset = AmaPskuMapping.objects.values(*columns).filter(mkt_cntry_name=country,mkt_name=channel,
		# level1=category,level3=brand)
        # print (list(queryset))
        session_code = check_session(request)
        return HttpResponse(json.dumps({'Data': list(queryset)}, cls=DjangoJSONEncoder), status=session_code,
                            content_type='application/json')


@is_valid_session
@csrf_exempt
def UpdatePSKU(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        Selectd_PSKU_ID = data['selectedRow'][0]
        print("selected psku id", Selectd_PSKU_ID)
        power = data['power']
        row_tuple = tuple(Selectd_PSKU_ID)
        queryset = AmaPskuMapping.objects.filter(psku_id__in=row_tuple).update(power_flag=power)
        session_code = check_session(request)
        queryset_updated_rows = AmaPskuMapping.objects.filter(psku_id__in=row_tuple).values('psku_id','mkt_cntry_name','mkt_name','level1','brand','prod_name','power_flag')
        print("update PSKU",list(queryset_updated_rows))
        return HttpResponse(json.dumps({'UpdatePSKuWD': list(queryset_updated_rows)}, cls=DjangoJSONEncoder), status=session_code,
                            content_type='application/json')



@is_valid_session
@csrf_exempt
def UpdateTargetWD(request):
    if request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        Selectd_PSKU_ID = data['selectedRow']
        print("targetWD", Selectd_PSKU_ID)
        targetWD = data['targetWD']
        print("targetWD", targetWD)

        queryset = AmaPskuMapping.objects.filter(psku_id=Selectd_PSKU_ID).update(wd_target=targetWD)
        session_code = check_session(request)
        queryset_updated_wd_rows = AmaPskuMapping.objects.filter(psku_id=Selectd_PSKU_ID).values('psku_id','mkt_cntry_name','mkt_name','level1','brand','prod_name','wd_target')
        print("update WD",list(queryset_updated_wd_rows))
        return HttpResponse(json.dumps({'UpdatePSKuWD': list(queryset_updated_wd_rows)}, cls=DjangoJSONEncoder), status=session_code,
                            content_type='application/json')
        