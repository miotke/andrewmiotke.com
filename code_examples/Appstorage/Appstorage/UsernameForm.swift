//
//  UsernameForm.swift
//  Appstorage
//
//  Created by Andrew on 8/11/23.
//

import SwiftUI

struct UsernameForm: View {
    
    @Binding var showUsernameForm: Bool

    @AppStorage("username") var username: String = ""

    var body: some View {
        NavigationView {
            Form {
                TextField("Username", text: $username)
            }
            .toolbar {
                ToolbarItem {
                    Button("Save") {
                        showUsernameForm.toggle()
                    }
                }
            }
        }
    }
}
