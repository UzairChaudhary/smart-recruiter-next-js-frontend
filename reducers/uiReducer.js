/* eslint-disable no-unreachable */
export const actioTypes = {
  openDropdown: "OPEN_DROPDOWN",
  closeDropdown: "CLOSE_DROPDOWN",
  toggleDropdown: "TOGGLE_DROPDOWN",
  
  openSidebar: "OPEN_SIDEBAR",
  closeSidebar: "CLOSE_SIDEBAR",
  toggleSidebar: "TOGGLE_SIDEBAR",
  
  userLoggedIn: "SHOW_PROFILE_ICON",
  userLoggedOut: "HIDE_PROFILE_ICON",

  userIsCandidate: "SHOW_CANDIDATE_SCREENS",
  userIsRecruiter: "SHOW_RECRUITER_SCREENS",

  openLoginSidebar: "SHOW_LOGIN_SIDEBAR",
  closeLoginSidebar: "HIDE_LOGIN_SIDEBAR",
};

export const uiReducer = (state, action) => {
  switch (action.type) {
    case actioTypes.openDropdown:
      return { ...state, isDropdownOpen: true };
      break;
    case actioTypes.closeDropdown:
      return { ...state, isDropdownOpen: false };
      break;
    case actioTypes.toggleDropdown:
      return { ...state, isDropdownOpen: !state.isDropdownOpen };
      break;
    
    case actioTypes.openSidebar:
      return { ...state, isSidebarOpen: true };
      break;
    case actioTypes.closeSidebar:
      return { ...state, isSidebarOpen: false };
      break;
    case actioTypes.toggleSidebar:
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
      break;
      
    case actioTypes.userLoggedIn:
      return { ...state, isUserLoggedIn: true };
      break;
    case actioTypes.userLoggedOut:
      return { ...state, isUserLoggedIn: false };
      break;
    
    case actioTypes.userIsCandidate:
      return { ...state, isUserCandidate: true };
      break;
    case actioTypes.userIsRecruiter:
      return { ...state, isUserCandidate: false };
      break;
    
    case actioTypes.openLoginSidebar:
      return { ...state, isLoginSidebarOpen: true };
      break;
    case actioTypes.closeLoginSidebar:
      return { ...state, isLoginSidebarOpen: false };
      break;

    default:
      return state;
  }
};
