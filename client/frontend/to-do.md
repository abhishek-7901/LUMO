
# TO-DO

## LUMO 

### Front end 
1. Home page needs to be given some buttons [DONE]
2. UI for Login needs to be revamped [Prabhat] [DONE]
3. UI for Register needs to be revamped [Prabhat] [DONE]
4. Tables for loans and items need to be created -> View loan , view table [Priyanka] (look at loan card data file in admin side) [NOT DONE]
5. Apply loans needs to be revamped UI [Prabhat] [DONE]
6. Tables UI needs to be revamped [Priyanka]
7. Apply loan logic for populating the form based on a list of items as recieved. [Prabhat] [DONE]
8. Add Validations for every form [Prabhat]
9. Error showing properly in case of any backend errors, consider dummy for now. 
10. Give drop downs for designation and department [Prabhat] [DONE]
11. User Dashboard UI [DONE]
12. Landing Page UI [Prabhat] [Done]

### Backend 
1. Make all tables and entities   - Use relational table to populate the apply for loan form, view loan cards availed, and view items purchased. 
2. Create APIs for creating and reading loans and items 
3. Error showing properly


### []API calls and meanings 


1. /listOfItems -> on landing on the page of apply loan to fill and populate the fields inside the form. 
2. /applyLoan -> POST request which will have item/loan details, check in backend, if there are loan cards available for that item type. and also link the loan id with the item id with the employee id with the issue id. [Prabhat-frontend-done] 
3. /employee/viewloans -> list of all loans on that user id (loan cards availed table)
4. /employee/viewItems -> list of all items purchased by that id (items purchased id) 
<!-- 5. /employee/viewItems -> all unavailed items (for apply loan logic) non filtered  -->
6. /employee/listOfItems -> all unavailed items in the pool



## LAMO

Front end  
1. Make login page[Prabhat] [DONE]
2. Make employee registeration page (shift from LUMO register to here)[Prabhat] [DONE]
3. Add and View employee list page[Prabhat] [DONE] and edit and delete buttons in the table
4. Loan card addition [Prabhat] [DONE]
5. Loan card table view [Prabhat] [DONE]
6. Loan card edit and delete 
7. Item creation page [Prabhat] [DONE]
8. Item table view [Prabhat] [DONE]
9. Item edit and delete
10. Add validations to every form in the backend.
11. Error showing properly in case any sent from the backend, consider dummy for now. [Prabhat] [DONE]
12. Give drop downs for designation and department [Prabhat] [DONE]
13. Admin Dashboard UI [Prabhat]  [DONE]

### Backend 
1. Make Loan master table - Loan id, type of loan, duration in years
2. Item master table - item id, category, description, value, item make.
3. Loan Item Relation table - issue id(primary key),Item id, loan id(joined on), employee id( TO SHOW CASE WHICH EMPLOYEE TOOK WHAT LOAN THAT IS VIEW ITEMS AND VEIW LOANS TABLE FOR EACH USER SPECIFICALLY)

### []API calls and meanings 
1. /admin/addUser-> register the user [Prabhat] [Done]
2. /admin/viewUser-> view all the users [Prabhat] [Done]
3. /admin/editUser-> edit the user LEFT IN BACKEND
4. /admin/deleteUser [Priyanka] [Done] LEFT IN BACKEND
5. /admin/addLoanCard -> add a loan card [Prabhat] [Done]
6. /admin/viewLoanCards -> send list of loan cards [Prabhat] [Done]
7. /admin/editLoanCard [Priyanka] NOT DONE
8. /admin/deleteLoanCard [Priyanka] [Done]
9. /admin/addItem [Prabhat] [Done]
10. /admin/editItem [Priyanka] NOT DONE
11. /admin/deleteItem [Priyanka] [Done]
12. /admin/viewItem [Prabhat] [Done]

Careful when you delte and update stuff, since data may cascade on top of each other. 

###ERRORS

Need to add navbar roles [DONE]
Need to figure out why admin/viewUser is not working[DONE]
Make designations, departments from a list which we can change in the frontend.
Making background color to the whole page in login and register

### Validationn

1. Admin Login UI [DONE] Validation [DONE]
2. Customer Data Management UI Validation [DONE]
3. User View Loan UI Validation
4. Admin Loan Managent UI Validation [DONE]
5. User Login UI Validation [DONE]
6. User View Item UI Validation
7. Admin Item Management UI Validation [DONE]
8. User Apply Loan UI Validation
9. Admin Dashboard UI Validation [DONE]
10. User Dashboard UI Validation [DONE]

