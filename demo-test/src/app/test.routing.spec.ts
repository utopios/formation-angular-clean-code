// import { ComponentFixture, TestBed } from "@angular/core/testing"
// import { AppComponent } from "./app.component"
// import { Router, RouterModule } from "@angular/router"
// import { Location } from "@angular/common"
// import { RouterTestingModule } from '@angular/router/testing'

// describe("Navigation E2E", () => {
//     let fixture = ComponentFixture<AppComponent>
//     let router: Router
//     let location: Location

//     beforeEach(async () => {
//         await TestBed.configureTestingModule({
//             imports: [
//                 RouterTestingModule.withRoutes([
                    
//                 ])
//             ]
//         }).compileComponents()
//         router = TestBed.inject(Router)
//         location = TestBed.inject(Location)
//         fixture = TestBed.createComponent(AppComponent)
//         router.initialNavigation()
//     })
// })

describe("E2E routing", () => {
    it("should navigate to login", () => {
        cy.visit('/login')
        cy.url().should('include', 'login')
    })
})