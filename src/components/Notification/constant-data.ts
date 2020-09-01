import theme from '../../utils/theme'
import { NotificationType } from '../../types'
import SuccessIcon from '../../assets/icons/tick.svg'
import ErrorIcon from '../../assets/icons/error.svg'
import InfoIcon from '../../assets/icons/info.svg'

const { SUCCESS, ERROR, INFO } = NotificationType

export const NOTIFICATION_DATA = {
  [SUCCESS]: {
    shadowColor: theme.colors.success,
    icon: SuccessIcon,
  },
  [ERROR]: {
    shadowColor: theme.colors.error,
    icon: ErrorIcon,
  },
  [INFO]: {
    shadowColor: theme.colors.info,
    icon: InfoIcon,
  },
}
