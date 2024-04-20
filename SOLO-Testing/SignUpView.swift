//
//  SignUpView.swift
//  SOLO-Testing
//
//  Created by Serena Huang on 2/13/24.
//

import SwiftUI

struct SignUpView: View {
    @EnvironmentObject var settings: UserSettings
    @Environment(\.dismiss) var dismiss
    
    @State private var currentPage: Int = 1
    @State private var answers: [String] = Array(repeating: "", count: 5)
    @State private var didTapCoach: Bool = false
    @State private var didTapAthlete: Bool = false
    
    static let color0 = Color(red: 52/255, green: 153/255, blue: 205/255);
    static let color1 = Color(red: 52/255, green: 133/255, blue: 205/255);
    static let color2 = Color(red: 53/255, green: 77/255, blue: 205/255);
    static let color3 = Color(red: 38/255, green: 37/255, blue: 108/255);
    let gradient = Gradient(colors: [color0, color1, color2, color3]);
    
    var body: some View {
        NavigationView {
            VStack {
                NavigationLink(destination: AthleteView(currentPage: $currentPage), isActive: $settings.navigateNowToAthleteView) {
                                    EmptyView()
                                }

                NavigationLink(destination: CoachView(), isActive: $settings.navigateNowToCoachView) {
                    EmptyView()
                }

                HStack(spacing:120) {
                    Text("CREATE ACCOUNT")
                        .font(Font.custom("Poppins-SemiBold", size:24))
                        .padding(.leading,15)
                        .foregroundColor(.white)
                    Button(action: {
                        dismiss()
                    }) {
                        Image(systemName:"xmark").foregroundColor(.white)
                        
                    }
                }
                .frame(width: 400, height: 80, alignment: .leading)
                .background(LinearGradient(
                    gradient: gradient,
                    startPoint: .init(x: -0.1, y: 0.15),
                    endPoint: .init(x: 0.85, y: 0.85)
                ))
                
                if currentPage == 1 {
                    // Page 1
                    QuestionView(question: "What is your name?", step_num: currentPage, answer: $answers[0], didTapCoach: $didTapCoach, didTapAthlete: $didTapAthlete)
                } else if currentPage == 2 {
                    // Page 2
                    QuestionView(question: "What is your email address?", step_num: currentPage, answer: $answers[1], didTapCoach: $didTapCoach, didTapAthlete: $didTapAthlete)
                } else if currentPage == 3 {
                    // Page 3
                    QuestionView(question: "What is your phone number?", step_num: currentPage, answer: $answers[2], didTapCoach: $didTapCoach, didTapAthlete: $didTapAthlete)
                }
                else if currentPage == 4 {
                    // Page 4
                    QuestionView(question: "Upload a profile picture", step_num: currentPage, answer: $answers[3], didTapCoach: $didTapCoach, didTapAthlete: $didTapAthlete)
                }
                
                else if currentPage == 5 {
                    QuestionView(question: "Which role best describes you?", step_num: currentPage, answer: $answers[4], didTapCoach: $didTapCoach, didTapAthlete: $didTapAthlete)
                }

                
                Spacer()
                
                HStack {
                    if currentPage > 1 {
                        Button("BACK") {
                            currentPage -= 1
                            
                        }
                        .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                        .padding()
                        .font(Font.custom("Poppins-Medium", size: 20))
                    }
                    
                    Spacer()
                    
                    if currentPage != 5 { // Adjust the value based on the number of pages
                        Button("NEXT") {
                            currentPage += 1
                        }
                        .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                        .padding()
                        .font(Font.custom("Poppins-Medium", size: 20))
                    } else {
                        // You can add a submit button or perform any other action here
                        
                        Button("NEXT") {
                            self.settings.isAthlete = didTapAthlete
                            self.settings.isCoach = didTapCoach

                            if self.settings.isAthlete {
                                self.settings.navigateNowToAthleteView = true
                            } else if settings.isCoach {
                                self.settings.navigateNowToCoachView = true
                            }
                        }
                        .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                        .font(Font.custom("Poppins-Medium", size: 20))
                        .padding(.trailing, 10)
                        
                        
                        .padding()
                    }
                }
            }
            .navigationBarBackButtonHidden(true)
            
        }
    }
    struct AthleteView: View {
        @EnvironmentObject var settings: UserSettings
        @Environment(\.dismiss) var dismiss
        @Binding var currentPage: Int


        @State private var answers: [String] = Array(repeating: "", count: 5)
        let questions = ["What is your age?", "What is your gender?", "What is your height?", "What is your weight?", "What is your Educational Institute/Athletic Program and/or Youth Athletic Club (i.e., Middle School, High School, College, University)"]
        var body: some View {
            VStack {
                HStack(spacing: 120) {
                    
                    
                    Text("Athlete Profile")
                        .font(Font.custom("Poppins-SemiBold", size: 24))
                        .padding(.leading, 15)
                        .foregroundColor(.white)
                    
                }
                .frame(width: 400, height: 80, alignment: .leading)
                .background(LinearGradient(gradient: Gradient(colors: [Color(red: 52/255, green: 153/255, blue: 205/255), Color(red: 52/255, green: 133/255, blue: 205/255), Color(red: 53/255, green: 77/255, blue: 205/255), Color(red: 38/255, green: 37/255, blue: 108/255)]), startPoint: .init(x: -0.1, y: 0.15), endPoint: .init(x: 0.85, y: 0.85)))
                
                ScrollView {
                    VStack(spacing: 15) { // Adjusted spacing
                        ForEach(Array(zip(questions.indices, questions)), id: \.0) { index, question in
                            ViewSpecificQuestions(question: question, answer: $answers[index])
                        }
                    }
                    .padding()
                }
                HStack {
                    
                    Button(action: {
                        dismiss()  // Manage currentPage or use dismiss() based on your flow
                    }) {
                        Text("BACK")
                            .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                            .padding()
                            .font(Font.custom("Poppins-Medium", size: 20))
                    }
                    Spacer()
                    Button("FINISH") {
                        settings.navigateNowToCompletion = true
                        settings.navigateNowToSignup = false
                    }
                    .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                    .font(Font.custom("Poppins-Medium", size: 20))
                    .padding(.trailing, 10)
                }
            }
        }
    }

    struct CoachView: View {
        @EnvironmentObject var settings: UserSettings
        @Environment(\.dismiss) var dismiss

        @State private var answers: [String] = Array(repeating: "", count: 2)
        let questions = ["What is your Title (i.e., Head Coach, Assistant Head Coach, Distance Coach)", "What is your Educational Institute/Athletic Program and/or Youth Athletic Club (i.e., Middle School, High School, College, University)"]
        var body: some View {
            VStack {
                HStack(spacing: 120) {
                    Text("Coach Profile")
                        .font(Font.custom("Poppins-SemiBold", size: 24))
                        .padding(.leading, 15)
                        .foregroundColor(.white)
                }
                .frame(width: 400, height: 80, alignment: .leading)
                .background(LinearGradient(gradient: Gradient(colors: [Color(red: 52/255, green: 153/255, blue: 205/255), Color(red: 52/255, green: 133/255, blue: 205/255), Color(red: 53/255, green: 77/255, blue: 205/255), Color(red: 38/255, green: 37/255, blue: 108/255)]), startPoint: .init(x: -0.1, y: 0.15), endPoint: .init(x: 0.85, y: 0.85)))
                
                ScrollView {
                    VStack(spacing: 15) { // Adjusted spacing
                        ForEach(Array(zip(questions.indices, questions)), id: \.0) { index, question in
                            ViewSpecificQuestions(question: question, answer: $answers[index])
                        }
                    }
                    .padding()
                }
                
                HStack {
                    
                    Button(action: {
                        dismiss()  // Manage currentPage or use dismiss() based on your flow
                    }) {
                        Text("BACK")
                            .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                            .padding()
                            .font(Font.custom("Poppins-Medium", size: 20))
                    }
                    Spacer()
                    Button("FINISH") {
                        settings.navigateNowToCompletion = true
                        settings.navigateNowToSignup = false
                    }
                    .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                    .font(Font.custom("Poppins-Medium", size: 20))
                    .padding(.trailing, 10)
                }
            }
        }
    }
    
    

    struct ViewSpecificQuestions: View {
        var question: String
        @Binding var answer: String

        var body: some View {
            VStack(alignment: .leading) {
                Text(question)
                    .font(Font.custom("Poppins-SemiBold", size: 20))
                    .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))

                TextField("Enter your answer", text: $answer)
                    .font(Font.custom("Poppins-Regular", size: 16))
                    .autocapitalization(.none)
                    .disableAutocorrection(true)
                    .frame(height: 40)
                    .padding(.leading, 10.0)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.black.opacity(0.2), lineWidth: 1)
                    )
                Spacer()
            }
            .padding()
        }
    }

    struct QuestionView: View {
        var question: String
        var step_num: Int
        @Binding var answer: String
        @Binding var didTapCoach: Bool
        @Binding var didTapAthlete: Bool
        
        var body: some View {
            VStack (alignment: .leading) {
                Text("Step \(step_num) of 5")
                    .foregroundColor(Color(red: 0.208, green: 0.298, blue: 0.804))
                    .font(Font.custom("Poppins-Medium", size: 16))
                    .textCase(.uppercase)
                
                
                Text(question)
                    .font(Font.custom("Poppins-SemiBold", size: 24))
                
                if (step_num == 4) {
                    Button(action: {}) {
                        VStack {
                            Image(systemName: "plus")
                                .font(Font.custom("Poppins-Medium", size: 18))
                                .foregroundColor(.gray)
                            Text("Upload")
                                .font(Font.custom("Poppins-Regular", size: 14))
                                .foregroundColor(.gray)
                        }
                        
                    }
                    .frame(width: 100, height: 100)
                    .overlay(Rectangle()
                        .strokeBorder(.gray, style: StrokeStyle(lineWidth: 2, dash: [5]))
                    )
                    
                    
                }
                else if (step_num == 5) {
                    
                    VStack {
                        Button(action: {
                            self.didTapCoach = true
                            self.didTapAthlete = false
                            
                        }) {
                            VStack(alignment:.leading, spacing:10) {
                                Text("Coach")
                                    .font(Font.custom("Poppins-Semibold", size:20))
                                
                                Text("I'd like to train athletes to reach their goals in speed, form, endurance.")
                                    .font(Font.custom("Poppins-Regular", size:14))
                                
                            }
                            .padding(.leading,10)
                            
                            .multilineTextAlignment(/*@START_MENU_TOKEN@*/.leading/*@END_MENU_TOKEN@*/)
                            .foregroundColor(didTapCoach ? Color(red: 0.208, green: 0.298, blue: 0.804) : .black.opacity(0.6))
                        }
                        .frame(width: 320, height: 110)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(didTapCoach ? Color(red: 0.208, green: 0.298, blue: 0.804) : .black.opacity(0.6), lineWidth: 1)
                            
                        )
                        
                        
                        Button(action: {
                            self.didTapCoach = false
                            self.didTapAthlete = true
                        }) {
                            VStack(alignment:.leading, spacing:10) {
                                Text("Athlete")
                                    .font(Font.custom("Poppins-Semibold", size:20))
                                //                                .padding(.leading,10)
                                
                                Text("I'd like to have a personal coach train me to reach my athletic goals.")
                                    .font(Font.custom("Poppins-Regular", size:14))
                                
                                
                            }
                            .padding(.leading,10)
                            .padding(.trailing,10)
                            .multilineTextAlignment(/*@START_MENU_TOKEN@*/.leading/*@END_MENU_TOKEN@*/)
                            .foregroundColor(didTapAthlete ? Color(red: 0.208, green: 0.298, blue: 0.804) : .black.opacity(0.6))
                        }
                        .frame(width: 320, height: 110)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(didTapAthlete ? Color(red: 0.208, green: 0.298, blue: 0.804) : .black.opacity(0.6), lineWidth: 1)
                            
                        )
                    }
                }
                else {
                    TextField("Enter your answer", text: $answer)
                        .font(Font.custom("Poppins-Regular", size: 16))
                    //                    .textFieldStyle(RoundedBorderTextFieldStyle())
                        .autocapitalization(.none)
                        .disableAutocorrection(true)
                        .frame(height: 40)
                        .padding(.leading,10.0)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(.black.opacity(0.2), lineWidth: 1)
                            
                        )
                }
                
                
                Spacer()
            }
            .frame(width:350, alignment: .leading)
            .padding()
        }
    }
    
}
