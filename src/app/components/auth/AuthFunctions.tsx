import { signIn,signOut } from "@/lib/auth"

export function SignIn(){
    return(
      <form
        action={async()=>{
          "use server"
          await signIn()
        }}
        >
          <button type="submit">Sign In</button>  
        </form>
    )
  }
  
  export function SignOut() {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    )
  }