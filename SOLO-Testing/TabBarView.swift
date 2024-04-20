//
//  TabBarView.swift
//  SOLO-Testing
//
//  Created by Serena Huang on 2/13/24.
//

import SwiftUI

struct TabBarView: View {
    let navigateTo: String
    let defaultAthlete = AthleteInfo(name: "Lucy", image: "WomenAth1", location: "Los Angeles, CA")

    var body: some View {
        TabView {
            NavigationView {
                // Conditional navigation based on the string parameter
                if navigateTo == "Athlete" {
                    CurrentAthleteView(currentAthlete: defaultAthlete)
                } else {
                    HomeView() // Assuming HomeView is the default view
                }
            }
            .tabItem {
                Image(systemName: "house.fill")
                Text("Home")
            }

            NavigationView {
                ProfileView()
            }
            .tabItem {
                Image(systemName: "person.fill")
                Text("Profile")
            }
        }
    }
}
