# The HWSet class holds general data about availability, capacity, inventory, and id information.
class HWSet:

    # Initialize private attributes
    def __init__(self):
        self.__availability = 200
        self.__capacity = 200
        self.__checkOutQty = []
        self.__checkOutId = -1

    # Getter methods for availability and capacity variables
    def get_availability(self):
        return self.__availability

    def get_capacity(self):
        return self.__capacity

    # Methods for check out and check in
    def check_out(self, qty):
        # If there's not enough available return error
        if qty > self.__availability:
            return -1
        
        # Decrement availability by quantity
        self.__availability -= qty

        # Increment checkout id
        self.__checkOutId += 1
        # Set the value in the list to the quantity
        self.__checkOutQty.append(qty)
        return self.__checkOutId

    def check_in(self, id, qty):
        # Checks if the idx is valid
        if id < len(self.__checkOutQty) and id > -1:
            # Checks id qty greater than or equal to the value in the list
            if qty <= self.__checkOutQty[id]:
            # Increments availability by quantity
                self.__availability += qty
                return 0
            else:
            # Returns error
                return -1
        else:
            # Returns error
            return -1