CREATE DATABASE login;

-- set extintion
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- users=employee
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) Not NULL,
    user_email VARCHAR(255) Not NULL,
    user_password VARCHAR(255) Not NULL
);

-- insert fake users

INSERT INTO users(user_name,user_email,user_password) VALUES ('Ammar','esrawiaammar22@gmail.com','hellohello');

-- جدول الأدوار
CREATE TABLE roles (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
  user_id uuid REFERENCES users(user_id),
  role_id INT REFERENCES roles(role_id),
  PRIMARY KEY (user_id, role_id)
);
INSERT INTO user_roles (role_id, user_id) VALUES
  ((SELECT role_id FROM roles WHERE role_name = 'admin'), (SELECT user_id FROM users WHERE user_email = 'esrawiamdr5959fa106@gmail.com'));
INSERT INTO user_roles (role_id, user_id) VALUES
  ((SELECT role_id FROM roles WHERE role_name = 'admin'), (SELECT user_id FROM users WHERE user_email = '123@gmail.com'));


-- جدول الصلاحيات
CREATE TABLE permissions (
  permission_id SERIAL PRIMARY KEY,
  permission_name VARCHAR(255) NOT NULL
);
-- جدول كسر
CREATE TABLE role_permissions (
  role_id INT REFERENCES roles(role_id),
  permission_id INT REFERENCES permissions(permission_id),
  PRIMARY KEY (role_id, permission_id)
);

-- إضافة أدوار
INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('user');

-- إضافة صلاحيات
INSERT INTO permissions (permission_name) VALUES ('dashboard_access');
-- تعيين صلاحيات للدور "admin"
INSERT INTO role_permissions (role_id, permission_id) VALUES
  ((SELECT role_id FROM roles WHERE role_name = 'admin'), (SELECT permission_id FROM permissions WHERE permission_name = 'dashboard_access'));

