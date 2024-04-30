//
//  Athlete.swift
//  SOLO-Testing
//
//  Created by Farahnaz Hoque on 4/29/24.
//

import Foundation
struct Athlete: Codable, Identifiable {
    let id: Int // Assuming athlete_id is an integer
    var name: String
    var email: String
    var phone_number: String
    var profile_pic: String?
    var age: Int
    var gender: String
    var height: Double
    var weight: Double
    var affiliation_id: Int
}
