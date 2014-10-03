Based on the original E-commerce tutorial by Troy Giunipero, see:
http://netbeans.org/kb/docs/javaee/ecommerce/setup.html

The following is a course-grained summary of setup steps and requirements.

The AffableBean application requires access to the JavaDB (Derby) database, which is 
preinstalled in the JDK, and is automatically registered in NetBeans.

Before running the application,

 1. From the IDE's Services window, under the Databases node right-click the 
    Java DB node and choose Create Database.

 2. In the Create Database dialog, type in 'affablebean' as the database name,
    'j1' as the user name, and 'j1' as the password.

 3. Click OK to exit the dialog.

 4. Run the SQL scripts found in this directory. The schema.sql script creates tables
    necessary for the application. The sampleData.sql script adds sample data to the
    tables. Run the schema creation script first, then run the sample data script. 
    To run scripts:

    a. Double-click each script node to open them in the IDE's editor.
    b. In the toolbar above the editor, make sure the connection to the
       'affablebean' database is selected:

        jdbc:derby://localhost:1527/affablebean

    c. Click the Run SQL button to run the script.



Notes:

    - The glassfish-resources.xml file creates the 'jdbc/affablebean' data source, and 'AffablebeanPool'
      connection pool on the server when the application is deployed.

    - The server may need to be restarted for the data source and connection pool settings to take
      effect.
