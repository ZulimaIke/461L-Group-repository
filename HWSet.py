# The HWSet class holds general data about availability, capacity, inventory, and id information.
class HWSet:

    # Initialize private attributes
    def __init__(self, availability, capacity, checkOutqty):
        self.__availability = availability
        self.__capacity = capacity
        self.__checkOutQty = checkOutqty

    # Getter methods for availability, capacity, and checkOutQty variables
    def get_availability(self):
        return self.__availability

    def get_capacity(self):
        return self.__capacity

    def get_checkOutQty(self):
        return self.__checkOutQty

    # Methods for check out and check in
    def check_out(self, id, qty):
        # If there's not enough available return error
        if qty > self.__availability:
            return -1
        
        # Decrement availability by quantity
        self.__availability -= qty

        # Add to CheckOut dictionary
        if id in self.__checkOutQty:
            self.__checkOutQty[id] += qty
        else:
            self.__checkOutQty[id] = qty

        return 0

    def check_in(self, id, qty):
        # Checks if the idx is valid
        if id in self.__checkOutQty:
            # Checks id qty greater than or equal to the value in the list
            if qty <= self.__checkOutQty[id]:
                # Increments availability by quantity
                self.__availability += qty
                # Decrement amount checked out
                self.__checkOutQty[id] -= qty
                
                return 0
            else:
            # Returns error
                return -1
        else:
            # Returns error
            return -1