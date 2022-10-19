import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import ModalDialog from '@mui/joy/ModalDialog'
import TextField from '@mui/joy/TextField'
import Typography from '@mui/joy/Typography'
import Link from 'next/link'
// @ts-ignore
import * as platformDetect from 'platform-detect'
import { useMemo } from 'react'

const DownloadModal = ({
    download,
    onClose,
    onSubmit
}: {
    download: number | false
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick') => void
    onSubmit: () => void
}) => {
    const downloadFolder = useMemo(() => {
        if (typeof window === 'undefined') {
            return undefined
        }

        switch (true) {
            case platformDetect.macos:
            case platformDetect.linux:
                return `~/Downloads/`
            case platformDetect.windows: // TODO see if windows has common downloads location
            default:
                return ''
        }
    }, [])
    const codeRunSnippet = `npx jawa ${downloadFolder}vscraper-config-${download}.json`

    return (
        <Modal
            open={!!download}
            onClose={onClose}
            sx={{
                borderRadius: 0
            }}
            componentsProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(3px)'
                    }
                }
            }}
        >
            <ModalDialog
                variant="outlined"
                size="lg"
                sx={{
                    minWidth: '860px',
                    textAlign: 'center'
                }}
            >
                <ModalClose variant="outlined" />

                <Box
                    sx={{
                        fontSize: '100px',
                        color: '#ffffff'
                    }}
                >
                    <SendAndArchiveIcon fontSize="inherit" color="info" />
                </Box>

                <Typography
                    component="h3"
                    level="h2"
                    sx={{
                        marginBottom: 5
                    }}
                >
                    Download + Run
                </Typography>

                <Typography
                    level="body1"
                    sx={{
                        marginBottom: 1
                    }}
                >
                    Your config is ready, you can download it and then run it through our{' '}
                    <Typography level="body1" component="strong" color="info">
                        jawa
                    </Typography>{' '}
                    CLI (command line tool).
                </Typography>

                <Typography
                    level="body1"
                    sx={{
                        marginBottom: 3
                    }}
                >
                    Only requirement is that you have{' '}
                    <Link href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">
                        <a target="_blank">
                            <Typography color="primary" component="u">
                                npm
                            </Typography>
                        </a>
                    </Link>{' '}
                    installed.
                </Typography>

                <Button
                    color="info"
                    size="lg"
                    sx={{
                        marginBottom: 2
                    }}
                    onClick={onSubmit}
                >
                    Download config
                </Button>

                <Typography
                    level="body1"
                    sx={{
                        marginBottom: 2
                    }}
                >
                    and then run it
                </Typography>

                <TextField
                    sx={{
                        marginBottom: 2
                    }}
                    componentsProps={{
                        input: {
                            readOnly: true
                        }
                    }}
                    variant="outlined"
                    color="info"
                    value={`$ ${codeRunSnippet}`}
                    endDecorator={
                        <IconButton
                            sx={{
                                cursor: 'pointer',
                                color: '#ffffff',
                                '&:hover': {
                                    background: 'transparent !important',
                                    color: '#ffffff'
                                },
                                '&:active': {
                                    opacity: 0.6
                                }
                            }}
                            variant="plain"
                            color="neutral"
                            title="Copy"
                            onClick={() => {
                                navigator.clipboard.writeText(codeRunSnippet).catch(console.error)
                            }}
                        >
                            <ContentCopyIcon />
                        </IconButton>
                    }
                />

                <Typography level="body2" component="em">
                    Note: make sure to adjust the path to the config file depending on your download folder location
                </Typography>
            </ModalDialog>
        </Modal>
    )
}

export default DownloadModal