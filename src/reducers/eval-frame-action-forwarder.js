/* eslint-disable no-fallthrough */

import { postActionToEvalFrame } from '../port-to-eval-frame'

// this function forwards certain white-listed actions to the eval-frame.
// If the eval frame is not ready, it automatically enqueues them for later sending.


const evalFrameActionForwarder = (state, action) => {
  switch (action.type) {
    // notebook level actions
    case 'SET_VIEW_MODE':
    case 'UPDATE_CELL_LIST':
    case 'CHANGE_SIDE_PANE_MODE':
    // cell actions
    case 'UPDATE_CELL_PROPERTIES':
    case 'CHANGE_CELL_TYPE':
    case 'MARK_CELL_NOT_RENDERED':
    case 'CELL_UP':
    case 'CELL_DOWN':
    case 'SELECT_CELL':
    case 'INSERT_CELL':
    case 'ADD_CELL':
    case 'DELETE_CELL': {
      if (state.evalFrameReady) {
        // if the eval frame is ready, send the action on to the frame
        //  and return the identical state
        postActionToEvalFrame(action)
        return state
      }
      // if the eval frame is not ready, return a copy of the state with this
      // action appended to the eval queue
      const evalFrameMessageQueue = state.evalFrameMessageQueue.slice()
      evalFrameMessageQueue.push(action.actionToPost)
      return Object.assign({}, state, { evalFrameMessageQueue })
    }
    default: {
      return state
    }
  }
}

export default evalFrameActionForwarder
