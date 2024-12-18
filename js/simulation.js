class DOSSimulation {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setupNetworkVisualization();
        this.isAttacking = false;
        this.metrics = {
            serverLoad: 0,
            responseTime: 0,
            bandwidth: 0
        };
        this.attackTypes = {
            'syn-flood': {
                name: 'SYN Flood',
                description: 'A SYN flood attack exploits the TCP handshake process by sending numerous SYN packets but never completing the handshake, exhausting the server\'s resources.',
                difficulty: 'Medium',
                impact: 'High',
                detection: 'Medium',
                loadImpact: 1.5,
                responseImpact: 2,
                bandwidthImpact: 1
            },
            'udp-flood': {
                name: 'UDP Flood',
                description: 'UDP flood attacks overwhelm random ports on a targeted host with IP packets containing UDP datagrams, causing the host to repeatedly check for applications listening at these ports.',
                difficulty: 'Low',
                impact: 'Medium',
                detection: 'Easy',
                loadImpact: 1,
                responseImpact: 1.5,
                bandwidthImpact: 2
            },
            'http-flood': {
                name: 'HTTP Flood',
                description: 'HTTP flood attacks generate a massive volume of HTTP GET or POST requests to overwhelm a web server\'s ability to handle legitimate traffic.',
                difficulty: 'Medium',
                impact: 'High',
                detection: 'Hard',
                loadImpact: 2,
                responseImpact: 1.5,
                bandwidthImpact: 1
            },
            'slowloris': {
                name: 'Slowloris',
                description: 'Slowloris is a type of DOS attack that uses partial HTTP requests to slowly exhaust the server\'s connection pool, making it unavailable for legitimate users.',
                difficulty: 'High',
                impact: 'Medium',
                detection: 'Medium',
                loadImpact: 1,
                responseImpact: 3,
                bandwidthImpact: 0.5
            }
        };
    }

    initializeElements() {
        // Controls
        this.attackTypeSelect = document.getElementById('attackType');
        this.requestRateInput = document.getElementById('requestRate');
        this.numAttackersInput = document.getElementById('numAttackers');
        this.packetSizeInput = document.getElementById('packetSize');
        this.startButton = document.getElementById('startAttack');
        this.resetButton = document.getElementById('resetSimulation');

        // Metrics
        this.serverLoadGauge = document.querySelector('#serverLoad .gauge-fill');
        this.serverLoadValue = document.querySelector('#serverLoad .gauge-value');
        this.responseTimeGauge = document.querySelector('#responseTime .gauge-fill');
        this.responseTimeValue = document.querySelector('#responseTime .gauge-value');
        this.bandwidthGauge = document.querySelector('#bandwidth .gauge-fill');
        this.bandwidthValue = document.querySelector('#bandwidth .gauge-value');

        // Info
        this.attackInfo = document.getElementById('attackInfo');
        this.eventLog = document.getElementById('eventLog');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleAttack());
        this.resetButton.addEventListener('click', () => this.resetSimulation());
        this.attackTypeSelect.addEventListener('change', () => this.updateAttackInfo());

        // Update parameter values display
        const updateValue = (input) => {
            const value = input.value;
            input.nextElementSibling.textContent = value + (
                input.id === 'requestRate' ? '/s' :
                input.id === 'packetSize' ? ' bytes' : ''
            );
        };

        [this.requestRateInput, this.numAttackersInput, this.packetSizeInput].forEach(input => {
            input.addEventListener('input', () => updateValue(input));
            updateValue(input);
        });
    }

    setupNetworkVisualization() {
        const canvas = document.createElement('canvas');
        const container = document.getElementById('networkDiagram');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        container.appendChild(canvas);

        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.nodes = [];
        this.packets = [];

        // Create server node
        this.serverNode = {
            x: canvas.width * 0.8,
            y: canvas.height / 2,
            radius: 20,
            type: 'server'
        };

        // Create attacker nodes
        for (let i = 0; i < 10; i++) {
            this.nodes.push({
                x: canvas.width * 0.2,
                y: canvas.height * (0.2 + i * 0.07),
                radius: 10,
                type: 'attacker',
                active: false
            });
        }

        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections and packets
        this.updatePackets();
        this.drawConnections();
        
        // Draw nodes
        this.drawNode(this.serverNode);
        this.nodes.forEach(node => this.drawNode(node));

        requestAnimationFrame(() => this.animate());
    }

    drawNode(node) {
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = node.type === 'server' ? '#2563eb' :
            (node.active ? '#ef4444' : '#94a3b8');
        this.ctx.fill();
    }

    drawConnections() {
        this.packets.forEach(packet => {
            this.ctx.beginPath();
            this.ctx.arc(packet.x, packet.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = packet.isAttack ? '#ef4444' : '#22c55e';
            this.ctx.fill();
        });
    }

    updatePackets() {
        for (let i = this.packets.length - 1; i >= 0; i--) {
            const packet = this.packets[i];
            const dx = this.serverNode.x - packet.x;
            const dy = this.serverNode.y - packet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 5) {
                this.packets.splice(i, 1);
                this.updateMetrics(packet.isAttack);
            } else {
                const speed = 5;
                packet.x += (dx / distance) * speed;
                packet.y += (dy / distance) * speed;
            }
        }

        // Generate new packets
        if (this.isAttacking) {
            const activeNodes = this.nodes.filter(node => node.active);
            const requestRate = this.requestRateInput.value;
            
            if (Math.random() < requestRate / 1000) {
                const sourceNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
                if (sourceNode) {
                    this.packets.push({
                        x: sourceNode.x,
                        y: sourceNode.y,
                        isAttack: true
                    });
                }
            }
        }
    }

    updateMetrics(isAttack) {
        const attackType = this.attackTypes[this.attackTypeSelect.value];
        const packetSize = this.packetSizeInput.value;

        if (isAttack) {
            this.metrics.serverLoad = Math.min(100, this.metrics.serverLoad + attackType.loadImpact);
            this.metrics.responseTime = Math.min(1000, this.metrics.responseTime + attackType.responseImpact * 10);
            this.metrics.bandwidth = Math.min(100, this.metrics.bandwidth + (attackType.bandwidthImpact * packetSize / 100));
        }

        // Natural decay
        if (!this.isAttacking) {
            this.metrics.serverLoad = Math.max(0, this.metrics.serverLoad - 1);
            this.metrics.responseTime = Math.max(0, this.metrics.responseTime - 5);
            this.metrics.bandwidth = Math.max(0, this.metrics.bandwidth - 0.5);
        }

        // Update UI
        this.serverLoadGauge.style.width = `${this.metrics.serverLoad}%`;
        this.serverLoadValue.textContent = `${Math.round(this.metrics.serverLoad)}%`;
        
        this.responseTimeGauge.style.width = `${this.metrics.responseTime / 10}%`;
        this.responseTimeValue.textContent = `${Math.round(this.metrics.responseTime)}ms`;
        
        this.bandwidthGauge.style.width = `${this.metrics.bandwidth}%`;
        this.bandwidthValue.textContent = `${Math.round(this.metrics.bandwidth)} Mbps`;
    }

    toggleAttack() {
        this.isAttacking = !this.isAttacking;
        this.startButton.textContent = this.isAttacking ? 'Stop Attack' : 'Start Attack';
        this.startButton.classList.toggle('active');

        const numAttackers = parseInt(this.numAttackersInput.value);
        this.nodes.forEach((node, index) => {
            node.active = this.isAttacking && index < numAttackers;
        });

        this.logEvent(this.isAttacking ? 'Attack started' : 'Attack stopped');
    }

    resetSimulation() {
        this.isAttacking = false;
        this.startButton.textContent = 'Start Attack';
        this.startButton.classList.remove('active');
        this.metrics = { serverLoad: 0, responseTime: 0, bandwidth: 0 };
        this.packets = [];
        this.nodes.forEach(node => node.active = false);
        this.updateMetrics(false);
        this.logEvent('Simulation reset');
    }

    updateAttackInfo() {
        const attackType = this.attackTypes[this.attackTypeSelect.value];
        this.attackInfo.innerHTML = `
            <h3>${attackType.name}</h3>
            <p>${attackType.description}</p>
            <div class="attack-characteristics">
                <div class="characteristic">
                    <span class="label">Difficulty to Execute:</span>
                    <span class="value">${attackType.difficulty}</span>
                </div>
                <div class="characteristic">
                    <span class="label">Impact Level:</span>
                    <span class="value">${attackType.impact}</span>
                </div>
                <div class="characteristic">
                    <span class="label">Detection Difficulty:</span>
                    <span class="value">${attackType.detection}</span>
                </div>
            </div>
        `;
        this.logEvent(`Attack type changed to ${attackType.name}`);
    }

    logEvent(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `[${timestamp}] ${message}`;
        this.eventLog.insertBefore(logEntry, this.eventLog.firstChild);
    }
}

// Initialize the simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DOSSimulation();
});
