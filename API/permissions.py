from rest_framework import permissions

class isOwner(permissions.BasePermission):
    """ Custom permission to allow only the owner to edit"""

    def has_object_permission(self, request , view , obj):
        return obj.user == request.user

class isManager(permissions.BasePermission):
    """Allow the manager to approve the application """

    def has_object_permission(self, request , view , obj):
        return True
