import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const backgroundColorsList = [
  'red',
  'blue',
  'green',
  'orange',
  'violet',
  'yellow',
  'sky-blue',
  'aqua',
]
const getInitialClassName = () =>
  backgroundColorsList[Math.floor(Math.random() * backgroundColorsList.length)]

const RenderDetails = props => {
  const {eachApp, deleteUserApplicationDetails, showPassword} = props
  const {id, websiteName, username, password, initialClassName} = eachApp
  const initialSmallCase = websiteName.slice(0, 1)
  const initial = initialSmallCase.toUpperCase()

  const deleteUserDetails = () => {
    deleteUserApplicationDetails(id)
  }

  return (
    <li className="each-user-details">
      <div className={`initial-container ${initialClassName}`}>
        <p className="initial">{initial}</p>
      </div>
      <div className="app-details">
        <div className="app-user">
          <p className="website-name">{websiteName}</p>
          <p className="user-name">{username}</p>
          {showPassword ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={deleteUserDetails}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

class App extends Component {
  state = {
    userAppsDetailsList: [],
    websiteName: '',
    username: '',
    password: '',
    searchInputValue: '',
    showPassword: false,
  }

  addWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  addUsername = event => {
    this.setState({username: event.target.value})
  }

  addPassword = event => {
    this.setState({password: event.target.value})
  }

  toggleCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  addWebsiteUsernamePassword = event => {
    event.preventDefault()
    const {websiteName, username, password, userAppsDetailsList} = this.state
    const initialClassName = getInitialClassName()
    if (username !== '' && password !== '' && websiteName !== '') {
      const newUserDetails = {
        id: uuidv4(),
        websiteName,
        username,
        password,
        initialClassName,
      }
      this.setState({
        userAppsDetailsList: [...userAppsDetailsList, newUserDetails],
        websiteName: '',
        username: '',
        password: '',
      })
    }
  }

  deleteUserApplicationDetails = id => {
    const {userAppsDetailsList} = this.state
    const updatedUserAppDetailsList = userAppsDetailsList.filter(
      eachApp => eachApp.id !== id,
    )

    this.setState({userAppsDetailsList: updatedUserAppDetailsList})
  }

  render() {
    const {
      websiteName,
      username,
      password,
      userAppsDetailsList,
      showPassword,
      searchInputValue,
    } = this.state

    const filteredAppsList = userAppsDetailsList.filter(eachApp =>
      eachApp.websiteName
        .toLowerCase()
        .includes(searchInputValue.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="small-image"
          />
          <div className="add-password-card">
            <form
              className="password-form"
              onSubmit={this.addWebsiteUsernamePassword}
            >
              <h1 className="heading">Add New Password</h1>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-image"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={websiteName}
                  onChange={this.addWebsite}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-image"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.addUsername}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-image"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.addPassword}
                />
              </div>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="image"
          />
        </div>
        <div className="saved-password-card">
          <div className="your-password-container">
            <div className="heading-container">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="passwords-count">{filteredAppsList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-image"
                alt="search"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-saved-passwords-container">
            <div className="show-password-container">
              <input
                type="checkbox"
                className="checkbox"
                onChange={this.toggleCheckbox}
                id="showPwd"
              />
              <label htmlFor="showPwd" className="description">
                Show Passwords
              </label>
            </div>
            <ul className="user-app-details">
              {filteredAppsList.length ? (
                filteredAppsList.map(eachUserApp => (
                  <RenderDetails
                    eachApp={eachUserApp}
                    key={eachUserApp.id}
                    showPassword={showPassword}
                    deleteUserApplicationDetails={
                      this.deleteUserApplicationDetails
                    }
                  />
                ))
              ) : (
                <div className="no-pwd-img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    className="no-password"
                    alt="no passwords"
                  />
                  <p className="no-passwords">No passwords</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default App
