CREATE TABLE task (
    id serial primary key,
    description varchar(255) not null
);

INSERT INTO task (description) VALUES ('My test task.');
INSERT INTO task (description) VALUES ('My other test task.');