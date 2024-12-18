class DosAnimation {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.server = {
            x: 0,
            y: 0,
            width: 60,
            height: 80,
            health: 100
        };
        
        this.clients = [];
        this.attackers = [];
        this.packets = [];
        
        this.isAttacking = false;
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Position server in the center-right
        this.server.x = this.canvas.width * 0.8;
        this.server.y = this.canvas.height / 2 - this.server.height / 2;
        
        // Create legitimate clients
        for (let i = 0; i < 3; i++) {
            this.clients.push({
                x: this.canvas.width * 0.2,
                y: this.canvas.height * (0.3 + i * 0.2),
                size: 20,
                color: '#22c55e'
            });
        }
        
        // Create attackers (initially hidden)
        for (let i = 0; i < 10; i++) {
            this.attackers.push({
                x: this.canvas.width * 0.1,
                y: this.canvas.height * (0.1 + i * 0.08),
                size: 20,
                color: '#ef4444',
                active: false
            });
        }
        
        this.animate();
        this.setupControls();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = 400; // Fixed height for better visualization
    }

    drawServer() {
        this.ctx.fillStyle = `hsl(${this.server.health * 1.2}, 70%, 50%)`;
        this.ctx.fillRect(this.server.x, this.server.y, this.server.width, this.server.height);
        
        // Draw server health bar
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.server.x, this.server.y - 20, this.server.width, 10);
        this.ctx.fillStyle = `hsl(${this.server.health * 1.2}, 70%, 50%)`;
        this.ctx.fillRect(this.server.x, this.server.y - 20, this.server.width * (this.server.health / 100), 10);
    }

    drawClients() {
        [...this.clients, ...this.attackers].forEach(client => {
            if (client.active || this.clients.includes(client)) {
                this.ctx.beginPath();
                this.ctx.arc(client.x, client.y, client.size / 2, 0, Math.PI * 2);
                this.ctx.fillStyle = client.color;
                this.ctx.fill();
            }
        });
    }

    createPacket(source, isAttack = false) {
        this.packets.push({
            x: source.x + source.size / 2,
            y: source.y,
            targetX: this.server.x,
            targetY: this.server.y + this.server.height / 2,
            speed: isAttack ? 3 : 2,
            color: isAttack ? '#ef4444' : '#22c55e',
            size: isAttack ? 4 : 6
        });
    }

    updatePackets() {
        for (let i = this.packets.length - 1; i >= 0; i--) {
            const packet = this.packets[i];
            const dx = packet.targetX - packet.x;
            const dy = packet.targetY - packet.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < packet.speed) {
                // Packet reached server
                if (packet.color === '#ef4444' && this.server.health > 0) {
                    this.server.health = Math.max(0, this.server.health - 1);
                }
                this.packets.splice(i, 1);
            } else {
                packet.x += (dx / distance) * packet.speed;
                packet.y += (dy / distance) * packet.speed;
            }
        }
    }

    drawPackets() {
        this.packets.forEach(packet => {
            this.ctx.beginPath();
            this.ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
            this.ctx.fillStyle = packet.color;
            this.ctx.fill();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawServer();
        this.drawClients();
        this.updatePackets();
        this.drawPackets();
        
        // Generate legitimate traffic
        if (Math.random() < 0.03) {
            const client = this.clients[Math.floor(Math.random() * this.clients.length)];
            this.createPacket(client);
        }
        
        // Generate attack traffic
        if (this.isAttacking && Math.random() < 0.1) {
            const attacker = this.attackers[Math.floor(Math.random() * this.attackers.length)];
            if (attacker.active) {
                this.createPacket(attacker, true);
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }

    setupControls() {
        const controls = document.createElement('div');
        controls.className = 'animation-controls';
        controls.innerHTML = `
            <button id="toggleAttack">Start Attack</button>
            <button id="reset">Reset</button>
        `;
        this.container.appendChild(controls);
        
        const toggleBtn = document.getElementById('toggleAttack');
        const resetBtn = document.getElementById('reset');
        
        toggleBtn.addEventListener('click', () => {
            this.isAttacking = !this.isAttacking;
            toggleBtn.textContent = this.isAttacking ? 'Stop Attack' : 'Start Attack';
            this.attackers.forEach(attacker => attacker.active = this.isAttacking);
        });
        
        resetBtn.addEventListener('click', () => {
            this.server.health = 100;
            this.isAttacking = false;
            toggleBtn.textContent = 'Start Attack';
            this.packets = [];
            this.attackers.forEach(attacker => attacker.active = false);
        });
    }
}

// Initialize the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dosAnimation');
    if (container) {
        new DosAnimation(container);
    }
});
