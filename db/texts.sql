INSERT INTO reports (
    week, title, description
) VALUES (
    1,
    "In order to run this application you will have to execute the following commands:",
    "<h3>`npm install`</h3>
    <p>install all the necessery npm modules.</p>
    <h3>`npm start</h3>
    <p>Start the application in development mode.</p>
    <h3>`npm run build`</h3>
    <p>Build the application in production mode."
);

INSERT INTO reports (
    week, title, description
) VALUES (
    2,
    "",
    "<h1> Backend server for the project Me-react </h1>

<h2>Available Scripts</h2>

<h3>Clone the repository :</h3>
<code>git clone <a href=` https://github.com/WissamSawah/me-api.git`>https://github.com/WissamSawah/me-api.git</code></a>

<h3>Setup the Database</h3>

<p>Locate to the directory me-api/db and run the following commands:</p>

<h3>To enter the sqlite terminal:</h3>
<code>sqlite3 texts.sql</code>

<h3>To create the necessary tables:</h3>
<code>.read migrate.sql</code>

<h3>To insert data into the tables:</h3>
<code>.read texts.sql</code>

<h3>To exit sqlite terminal:</h3>
<code>.exit</code>

<h3>Start the server by running:</h3>
<code>npm start</code>


<p>Link to github: <a href=` (https://github.com/WissamSawah/me-api)`>Me-api</a></p>"
)
