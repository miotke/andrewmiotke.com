//
//  ContentView.swift
//  Appstorage
//
//  Created by Andrew on 8/11/23.
//

import SwiftUI

struct ContentView: View {

    @AppStorage("username") var username: String = ""

    @State var showUsernameForm: Bool = false

    var body: some View {
        NavigationView {
            Group {
                Text("Username is: \(username)")
            }
            .toolbar {
                ToolbarItem {
                    Button("Change username") {
                        showUsernameForm.toggle()
                    }
                    .sheet(isPresented: $showUsernameForm) {
                        UsernameForm(showUsernameForm: $showUsernameForm)
                    }
                }
            }
        }

    }
}
