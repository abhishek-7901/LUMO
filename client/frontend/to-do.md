
# TO-DO

## LUMO 

### Front end 
1. Home page needs to be given some buttons 
2. UI for Login needs to be revamped
3. UI for Register needs to be revamped
4. Tables for loans and items need to be created 
5. Apply loans needs to be revamped UI
6. Tables UI needs to be revamped
7. Apply loan logic for populating the form based on a list of items as recieved. 
8. Add Validations for every form
9. Error showing properly

### Backend 
1. Make all tables and entities   - Use relational table to populate the apply for loan form, view loan cards availed, and view items purchased. 
2. Create APIs for creating and reading loans and items 
3. Error showing properly


### []API calls and meanings 


1. /listOfItems -> on landing on the page of apply loan to fill and populate the fields inside the form. 
2. /applyloan -> POST request which will have item/loan details, check in backend, if there are loan cards available for that item type. and also link the loan id with the item id with the employee id with the issue id. 
3. /user/viewloans/{id} -> list of all loans on that user id (loan cards availed table)
4. /user/viewitems/{id} -> list of all items purchased by that id (items purchased id)

## LAMO

Front end  
1. Make login page [DONE]
2. Make employee registeration page (shift from LUMO register to here) [DONE]
3. Add and View employee list page [DONE] and edit and delete buttons in the table
4. Loan card addition [DONE]
5. Loan card table view [DONE]
6. Loan card edit and delete 
7. Item creation page [DONE]
8. Item table view [DONE]
9. Item edit and delete
10. Add validations to every form in the backend.
11. Error showing properly
 
### Backend 
1. Make Loan master table - Loan id, type of loan, duration in years
2. Item master table - item id, category, description, value, item make.
3. Loan Item Relation table - issue id(primary key),Item id, loan id(joined on), employee id( TO SHOW CASE WHICH EMPLOYEE TOOK WHAT LOAN THAT IS VIEW ITEMS AND VEIW LOANS TABLE FOR EACH USER SPECIFICALLY)

### []API calls and meanings 
1. /admin/addUser-> register the user 
2. /admin/viewUser-> view all the users 
3. /admin/editUser-> edit the user
4. /admin/deleteUser
5. /admin/addLoanCard -> add a loan card
6. /admin/viewLoanCards -> send list of loan cards
7. /admin/editLoanCard 
8. /admin/deleteLoanCard
9. /admin/addItem
10. /admin/editItem
11. /admin/deleteItem
12. /admin/viewItem

Careful when you delte and update stuff, since data may cascade on top of each other. 


Need to add navbar roles [DONE]
Need to figure out why admin/viewUser is not working[DONE]
Make designations, departments from a list which we can change in the frontend.

