/**
 * Network configuration (UDP, TCP config)
 */
export const NETWORK = {
    udp:{
        ip: "239.255.22.5",
        port : 1450
    },
    tcp:{
        port: 2205
    }
}

/**
 * General config for the auditor
 */
export const AUDITOR_CONFIG = {
    clean_musicians_interval: 1000, // Millisecond | delay before the musicians container removes the inactive musicians
    max_musician_delay: 5000 // Millisecond | delay after which a musician is consider inactive if no sound is emitted from him. 
}