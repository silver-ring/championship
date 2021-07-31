package com.championship.backend.models

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
data class Match (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "participant_1_id")
    var participant1: Participant? = null,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "participant_2_id")
    var participant2: Participant? = null,

    @Column(name = "participant_1_score")
    var participant1Score: Int? = null,

    @Column(name = "participant_2_score")
    var participant2Score: Int? = null,

    @Column(name = "participant_group")
    var group: Int? = null,

    @Column(name = "round_closed")
    var roundClosed: Boolean? = null
)
