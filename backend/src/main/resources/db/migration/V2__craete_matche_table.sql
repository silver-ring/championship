CREATE TABLE IF NOT EXISTS Match
(
    id int NOT NULL AUTO_INCREMENT,
    participant_1_id int NOT NULL,
    participant_2_id int NOT NULL,
    participant_1_score int,
    participant_2_score int,
    participant_group int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (participant_1_id) REFERENCES Participant(id),
    FOREIGN KEY (participant_2_id) REFERENCES Participant(id)
);
