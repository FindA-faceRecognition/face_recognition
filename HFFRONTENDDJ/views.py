from django.shortcuts import render
from  rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *
import jwt
from datetime import datetime,timedelta,timezone
import face_recognition
import os
from pathlib import Path
import shutil

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY='qwertyuioigfghjbvcxsdfghjjuytdcvbcxsdfbn123gh1231dew'


@api_view(['GET','POST'])
def UpdateView(request,pk):
    if request.method == 'POST':
        try:
            decode=jwt.decode(request.data['token'],SECRET_KEY,algorithms=['HS256'])
            employee0 = Employee.objects.get(pk=pk)
            EmpSerializer=EmployeeSerializer(employee0,data=request.data)
            if EmpSerializer.is_valid():
                EmpSerializer.save()
                return Response(EmpSerializer.data)
        except:
            return Response({'error':'Login time expired'})    
    return Response(EmpSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','DELETE','POST'])
def DeleteView(request,pk):
    employee0 = Employee.objects.all()
    EmpSerializer=EmployeeSerializer(employee0,many=True)
    if request.method == 'POST':
        try:
            decode=jwt.decode(request.data['token'],SECRET_KEY,algorithms=['HS256'])
            employee = Employee.objects.get(pk=pk)
            employee.delete()
            newma='Welcome ' +str(employee.name)
            atta = Attendance.objects.get(name=newma)
            atta.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'error':'Login Time expired'})   
    return Response({'token':request.POST['token']},status=status.HTTP_200_OK)
    

@api_view(['GET'])
def detailpage(request,pk):
    employee = Employee.objects.get(pk=pk)
    EmpSerializer=EmployeeSerializer(employee)
    return Response(EmpSerializer.data)

@api_view(['GET'])
def viewALL(request):
    employee = Employee.objects.all()
    EmpSerializer=EmployeeSerializer(employee,many=True)
    attendance=Attendance.objects.all()
    attenanceserials=AttendanceSerializer(attendance,many=True)
    message={'EmpSerializer':EmpSerializer.data,'attenanceserials':attenanceserials.data}
    return Response(message,status=status.HTTP_200_OK)

@api_view(['GET'])
def viewEmployee(request):
    employee = Employee.objects.all()
    EmpSerializer=EmployeeSerializer(employee,many=True)
    attendance=Attendance.objects.all().filter(Day=str(datetime.now())[:10]).values()
    attenanceserials=AttendanceSerializer(attendance,many=True)
    message={'EmpSerializer':EmpSerializer.data,'attenanceserials':attenanceserials.data}
    return Response(message,status=status.HTTP_200_OK)

    

@api_view(['GET','POST'])
def searchemployee(request):
    if(os.path.exists(os.path.join(BASE_DIR,'static','newimages'))):
        shutil.rmtree(os.path.join(BASE_DIR,'static','newimages'))
    imgdir=os.path.join(BASE_DIR,'static','images')
    imgdirset=os.listdir(imgdir)
    
    
    if request.method=='POST':
        print(request.data)
        print(request.data['token'])
        try:
            count=0
            decode=jwt.decode(request.data['token'],SECRET_KEY,algorithms=['HS256'])
            serializer=FindaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                newimgdir=os.path.join(BASE_DIR,'static','newimages')
                newimgdirset=os.listdir(newimgdir)
                for imagefile in newimgdirset:
                    f1 = face_recognition.load_image_file(os.path.join(BASE_DIR,'static','newimages',imagefile))
                    fe=face_recognition.face_encodings(f1)
                    print('incoming file',imagefile)
                    

                if(len(fe)>0):
                    femain=fe[0]
                    for image in imgdirset:
                        path=os.path.join(BASE_DIR,'static','images',image)
                        f11 = face_recognition.load_image_file(os.path.join(BASE_DIR,'static','images',image))
                        fe1=face_recognition.face_encodings(f11)
                        print('running against file',image)
                        name=''
                        if(len(fe1)>0):
                            femain=fe[0]
                            fe1main=fe1[0]
                            result=face_recognition.compare_faces([fe1main],femain)
                            if (result[0]==True):
                                employee=Employee.objects.all()
                                for i in employee:
                                    imgfile=(str(i.image)).split('/')[1]
                                    if(image==imgfile):
                                        name='Welcome '+str(i.name)
                                        atandt=Attendance.objects.all()
                                        for newat in atandt:
                                            name1=str(newat.name)
                                            print('name1',name1)
                                            name2=name1.split(' ')
                                            print('name2',name2)
                                            name3=name2[1:]
                                            print('name3',name3)
                                            name4=' '.join(name3)
                                            print('name4',name4)
                                            if (name4==i.name) :
                                                if(str(newat.Day)==str(datetime.now())[:10]):
                                                    print('database date',str(newat.Day))
                                                    print('datetime date',str(datetime.now())[:10])
                                                    print('together',str(newat.Day)==str(datetime.now())[:10])
                                                    print('yeah')
                                                    count+=1
                                                    print('count',count)
                                        if(count ==0):
                                            Attendance.objects.create(name=name,Day=str(datetime.now())[:10],Time=str(datetime.now())[11:19])
                                            return Response({'message':[name,image,str(datetime.now())[:10],str(datetime.now())[11:19]]})
                                        else:
                                            return Response({'message':[name,image,str(datetime.now())[:10],'Earlier Today']})
                                return Response({'message':[image.split('.')[0],image,str(datetime.now())[:10],str(datetime.now())[11:19]]})                   
                                                
                                
                    return Response({'message':['No match found!!!']})
                else:
                    return Response({'message':['Please send a picture with an image facing the camera.']})
            return Response({'message':['haha']})
        except:
            return Response({'message':['Login time limit reached']})


#decode=jwt.decode(encode,'iam',algorithms=['HS256'])
@api_view(['GET','POST'])
def employee(request):
    if request.method=='POST':
        token=request.POST['token']
        try:
            decode=jwt.decode(request.data['token'],SECRET_KEY,algorithms=['HS256'])
            serializer = EmployeeSerializer(data=request.data)
            print(token)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'employee added'},status=status.HTTP_201_CREATED)
        except:
            return Response({'error':'Login Time expired'})   
        return Response({'error':'error'}) 
    

@api_view(['GET','POST'])
def index(request):
    op=Operator.objects.all()
    # encMessage = bytes(str(request.data['password']))
    # hashed = bcrypt.hashpw(encMessage, bcrypt.gensalt(14))
    # print(hashed)
    # print(bcrypt.checkpw(request.data['password'], hashed))
    # Operator.objects.create(username=request.data['username'],password=hashed)
    # return Response({'message':'done'})
    #--------------------------------------------------------------------------
    opserial=OperatorSerializer(op,many=True)
    payload={'some':'encoded data',
                       'exp':datetime.now(tz=timezone.utc)
                       + timedelta(hours=1)
            }
    for i in op:
        print('\n\n')
        print(i.password)
        print('\n\n')
        try:
            if(request.data['username']==i.username and request.data['password']==(i.password)):
                token=jwt.encode(payload,SECRET_KEY)
                print('user',i.password)
                token=jwt.encode(payload,SECRET_KEY,algorithm='HS256')
                return Response({'message':'Access Granted','token':token})
        except:
            return Response({'error':'Illegal User Access'})
    return Response({'error':'no user found'})#Response({'message':'hello there my gee'})
