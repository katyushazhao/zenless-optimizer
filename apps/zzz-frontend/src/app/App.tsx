import { ScrollTop } from '@genshin-optimizer/common/ui'
import '@genshin-optimizer/zzz/i18n' // import to load translations
import { theme } from '@genshin-optimizer/zzz/theme'
import { AgentProvider, DatabaseProvider } from '@genshin-optimizer/zzz/ui'
import {
  Box,
  Container,
  CssBaseline,
  Skeleton,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material'
import { Suspense, lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import PageHome from './PageHome'

const PageDriveDiscs = lazy(() => import('@genshin-optimizer/zzz/page-drivediscs'))
const PageWEngines = lazy(
  () => import('@genshin-optimizer/zzz/page-wengines')
)
const PageAgents = lazy(
  () => import('@genshin-optimizer/zzz/page-agents')
)
const PageTeams = lazy(() => import('@genshin-optimizer/zzz/page-teams'))
const PageTeam = lazy(() => import('@genshin-optimizer/zzz/page-team'))
const PageSettings = lazy(() => import('@genshin-optimizer/zzz/page-settings'))

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      {/* https://mui.com/guides/interoperability/#css-injection-order-2 */}
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <DatabaseProvider>
          <AgentProvider>
            <HashRouter basename="/">
              <Content />
              <ScrollTop />
            </HashRouter>
          </AgentProvider>
        </DatabaseProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

function Content() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      position="relative"
    >
      <Header anchor="back-to-top-anchor" />

      <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1 } }}>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{ width: '100%', height: '100%' }}
            />
          }
        >
          <Routes>
            <Route index element={<PageHome />} />
             <Route path="/drivediscs" element={<PageDriveDiscs />} />
            <Route path="/wengines" element={<PageWEngines />} />
            <Route path="/agents" element={<PageAgents />} />
            <Route path="/teams/*">
              <Route index element={<PageTeams />} />
              <Route path=":teamId/*" element={<PageTeam />} />
            </Route>
            <Route path="/settings" element={<PageSettings />} />
          </Routes>
        </Suspense>
      </Container>
    </Box>
  )
}
