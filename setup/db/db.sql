DROP DATABASE IF EXISTS git;
CREATE DATABASE git;
\c git
BEGIN;
    SAVEPOINT init;
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE DOMAIN email AS TEXT CHECK (VALUE ~* '^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$');
    CREATE TABLE user_data(
        user_id uuid DEFAULT uuid_generate_v4 (),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email email UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMP DEFAULT current_timestamp,
        lock INTEGER DEFAULT 0,
        PRIMARY KEY (user_id)
    );


    CREATE OR REPLACE FUNCTION validate_user(_email email, _password TEXT) RETURNS TABLE (userid uuid,first_name TEXT,last_name TEXT,username TEXT,phone TEXT, lock INTEGER )
    LANGUAGE plpgsql
    AS $$
        DECLARE
            counter INTEGER;
        BEGIN
            CREATE TEMP TABLE tempuser (
                   user_id uuid,
                   first_name TEXT,
                   last_name TEXT,
                   username TEXT,
                   phone TEXT,
                   lock INTEGER
            );
            INSERT INTO tempuser
            SELECT user_data.user_id,user_data.first_name,user_data.last_name,user_data.username,user_data.phone,user_data.lock
            FROM user_data
            WHERE email=_email AND password = crypt(_password,password);
            SELECT COUNT(*) INTO COUNTER FROM tempuser;
            IF counter=0 THEN
                RAISE EXCEPTION 'USER DOESNT EXIST';
            END IF;
            RETURN QUERY SELECT * FROM tempuser;

        END
    $$ ;


    CREATE OR REPLACE PROCEDURE create_user(_first_name TEXT,_last_name TEXT, _username TEXT, _email email, _password TEXT, _phone TEXT)
    LANGUAGE SQL
    AS $$
        INSERT INTO user_data(first_name,last_name,username, email,password,phone)
        VALUES (_first_name,_last_name,_username,_email,crypt(_password,gen_salt('bf')),_phone)
    $$;



    CREATE TABLE repositories(
        repository_id uuid DEFAULT uuid_generate_v4 (),
        repository_name TEXT NOT NULL,
        created_by uuid NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp,
        CONSTRAINT created_by_id_ FOREIGN KEY(created_by) REFERENCES user_data(user_id),
        PRIMARY KEY (repository_id)
    );
END TRANSACTION;
COMMIT;
