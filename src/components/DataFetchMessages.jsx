import Alert from "@mui/material/Alert"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

export const ErrorMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="error">
      Veriler çekilemedi
    </Alert>
  )
}

export const NoDataMessage = () => {
  return (
    <Alert sx={{ mt: 3 }} severity="warning">
      Gösterilecek veri bulunamadı
    </Alert>
  )
}

export const CardSkeleton = () => {
  return (
    <Stack 
      spacing={1} 
      sx={{ mt: 3, display: 'flex', justifyContent: 'start', alignItems: 'center', height: '100vh' }}
    >
      <Skeleton variant="rectangular" width={275} height={375} />
    </Stack>
  )
}

const TableSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={90} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={30} />
    </Stack>
  )
}

export default TableSkeleton
