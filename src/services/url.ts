export const urlService = {
  root: {
    index() {
      return '/'
    },
    githubRepo() {
      return 'https://github.com/kafelix496/coding-for-fun'
    }
  },
  github: {
    index() {
      return '/github'
    },
    signIn() {
      return '/github/sign-in'
    }
  }
}
