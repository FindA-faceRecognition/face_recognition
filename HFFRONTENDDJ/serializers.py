from rest_framework import serializers
from .models import Operator,Employee,Finda,Attendance

class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Operator
        fields='__all__'
        
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields='__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Attendance
        fields='__all__'

class FindaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Finda
        fields='__all__'