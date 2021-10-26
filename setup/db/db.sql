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
        nickname TEXT NOT NULL,
        email email  NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        PRIMARY KEY (user_id)
    );


    CREATE OR REPLACE FUNCTION validate_user(_email email, _password TEXT) RETURNS uuid
    LANGUAGE SQL
    AS $$
        DECLARE _id uuid;
        counter INTEGER;

        BEGIN
            SELECT COUNT(*) INTO counter,user_id INTO _id
            FROM user_data
            WHERE email=_email AND password = crypt(_password,password);
            IF counter=0 THEN
                RAISE EXCEPTION 'USER DOESNT EXIST';
            ELSE
                RETURN id;
            END IF;
        END
    $$ ;


    CREATE OR REPLACE PROCEDURE create_user(_first_name TEXT,_last_name TEXT, _nickname TEXT, _email email, _password TEXT, _phone TEXT)
    LANGUAGE SQL
    AS $$
        INSERT INTO user_data(first_name,last_name,nickname, email,password,phone)
        VALUES (_first_name,_last_name,_nickname,_email,crypt(_password,gen_salt('bf')),_phone)
    $$;



END TRANSACTION;
COMMIT;
