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
      return '/github/pulls'
    },
    connections() {
      return '/github/connections'
    },
    signIn() {
      return '/github/sign-in'
    }
  }
}
