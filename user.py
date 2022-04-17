class User:
    def __init__(self, username, password):
        self.__username = username
        self.__password = password

    def getUser(self):
        return self.__username

    def getPass(self):
        return self.__password


    def setUser(self, username):
        self.__username = username

    def setPass(self, password):
        self.__password = password

    def dbSend(self):
        return{
            "username": self.__username,
            "password": self.__password
        }
