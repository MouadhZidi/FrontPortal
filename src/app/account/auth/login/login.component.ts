import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import Swal from 'sweetalert2';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit,OnDestroy {
  intervalId = 0;
  message = '';
  seconds = 1;
uss:any
bloquedbn:boolean=false
matPers:any
  errr=false
  ereur2=false
  usss:any
  nbreEsaai:any
  form: any = {
    matpers: null,
    usepswd: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
exp:any
  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private route: Router,
    public languageService: LanguageService,
  ) {}
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
    // this.authService.tokenExp().subscribe((data) => {
    //   this.exp=data
    //   })
  }

  
  onSubmit() :void {
    const { matpers, usepswd } = this.form;
    console.log("1   ffff",matpers,"ppp",usepswd);
    
    let p=new Promise(resolve => {
    console.log("2   ffff",matpers,"ppp",usepswd);

        this.authService.findbymatpers(matpers).subscribe(
           data => {
    console.log("3   ffff",matpers,"ppp",usepswd);

            console.log("ffff",matpers,"ppp",usepswd);

            console.log("eeee",data);
            
                resolve( data);
                this.uss=data
                console.log("eeeeeeee"+this.uss.matpers)
                this.authService.login(matpers, usepswd).subscribe(
                  (data) => {
    console.log("3   ffff",matpers,"ppp",usepswd);

                    this.tokenStorage.saveToken(data.token);
                    this.tokenStorage.saveUser(data);
                    this.ereur2=false
                    this.errr=false
                    console.log(data)
                    // localStorage.setItem("us",username);
                    this.route.navigate(["/dashboard"])
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                    setTimeout(() => {
                      Swal.fire({
                        title: 'La session est expirée',
                        text: 'You won\'t be able to revert this!',
                        icon: 'warning',
                        confirmButtonColor: '#34c38f',
                      }) .then(result => {
                        if (result.value) {
                          this.route.navigate(["/account/login"])
                        }
                      });         
                      this.tokenStorage.signOut()
                    }, Number(this.exp.val1));
                    console.log(data.use_nbessai)
            
            
            
            
            if (data){ 
            
               Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bienvenu à notre espace '+this.tokenStorage.getUser().role_portail,
              showConfirmButton: false,
              timer: 3000
            });
            } 
            
            
                   /* this.toast.success({
                      detail: ' Success Message',
                      summary: data.message,
                      duration: 5000,
                    });*/
                  },
                  (err) => {
                    this.errr=true
                  
                
                
                
                 
                    
                    
                  }
                );
                
                
               
                //console.log("le data" + data);
               
                
                
               
                console.log('exected' + data);
            },
            err => {
                console.log(err);
            }
        );
     })
     p.then(()=>{ if(this.uss.use_nbessai>5){
      this.seconds=16
      this.ereur2=true
      
      this.countDown()
      





     }else if (this.uss.use_nbessai<5){


     }})
      
    }
    clearTimer() {
      clearInterval(this.intervalId);
    }
  

     start() {
      this.countDown();
    }
     stop() {
       this.clearTimer();
       this.ereur2=false
       this.message=null
     }
     private countDown() {
      this.clearTimer();
       this.intervalId = window.setInterval(() => {
        
         this.seconds -= 1;
         if (this.seconds === 0) {
           this.message = '';
          this.bloquedbn=false;

           this.stop();
         } else {
           if (this.seconds < 0) {
            this.seconds = 15;
           } // reset
           this.message = `Compte bloqué, veuillez réessayer aprés ${this.seconds} secondes`;
           this.bloquedbn=true;
         }
       }, 1000);
     }


  
      
      
      //this.form.matPers=null
      //this.form.usepswd=null
     
    




    


  


  ccccc($event){
    this.matPers=$event.target.value
    this.authService.findbymatpers($event.target.value).subscribe(
    (data: any[]) => {
      
      this.usss=data

this.nbreEsaai=this.uss.use_nbessai
console.log(this.nbreEsaai)

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );}
}


    


/* */
