class DefenseGame {
    constructor() {
        this.initializeElements();
        this.setupGame();
        this.setupEventListeners();
    }

    initializeElements() {
        // Game elements
        this.gameBoard = document.getElementById('gameBoard');
        this.startButton = document.getElementById('startGame');
        this.resetButton = document.getElementById('resetGame');
        
        // Score elements
        this.scoreValue = document.getElementById('scoreValue');
        this.levelValue = document.getElementById('levelValue');
        this.healthValue = document.getElementById('healthValue');
        this.creditsValue = document.getElementById('creditsValue');
        this.defenseRating = document.getElementById('defenseRating');
        
        // Game log
        this.gameLog = document.getElementById('gameLog');
        
        // Tool cards
        this.toolCards = document.querySelectorAll('.tool-card');
    }

    setupGame() {
        this.gameState = {
            isPlaying: false,
            score: 0,
            level: 1,
            health: 100,
            credits: 500,
            defenseRating: 0
        };

        this.defenseTools = {
            firewall: {
                cost: 100,
                effectiveness: 0.7,
                range: 100,
                icon: '🛡️'
            },
            loadBalancer: {
                cost: 200,
                effectiveness: 0.8,
                range: 150,
                icon: '⚖️'
            },
            rateLimiter: {
                cost: 150,
                effectiveness: 0.6,
                range: 120,
                icon: '🚦'
            },
            cache: {
                cost: 120,
                effectiveness: 0.5,
                range: 80,
                icon: '💾'
            }
        };

        this.activeDefenses = [];
        this.packets = [];
        this.selectedTool = null;

        // Clear game board
        this.gameBoard.innerHTML = '';
        
        // Add server element
        this.server = document.createElement('div');
        this.server.className = 'server';
        this.server.style.position = 'absolute';
        this.server.style.right = '20px';
        this.server.style.top = '50%';
        this.server.style.transform = 'translateY(-50%)';
        this.server.style.width = '60px';
        this.server.style.height = '80px';
        this.server.style.backgroundColor = '#2563eb';
        this.server.style.borderRadius = '4px';
        this.gameBoard.appendChild(this.server);

        this.updateUI();
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleGame());
        this.resetButton.addEventListener('click', () => this.resetGame());
        
        this.toolCards.forEach(card => {
            card.addEventListener('click', () => this.selectTool(card.dataset.tool));
        });

        this.gameBoard.addEventListener('click', (e) => {
            if (this.selectedTool && this.gameState.isPlaying) {
                this.placeDefense(e);
            }
        });
    }

    selectTool(toolType) {
        if (!this.gameState.isPlaying) return;

        const tool = this.defenseTools[toolType];
        if (this.gameState.credits >= tool.cost) {
            this.selectedTool = toolType;
            this.toolCards.forEach(card => card.classList.remove('selected'));
            document.querySelector(`[data-tool="${toolType}"]`).classList.add('selected');
        } else {
            this.logEvent('Not enough credits to purchase this defense tool!');
        }
    }

    placeDefense(event) {
        const tool = this.defenseTools[this.selectedTool];
        const rect = this.gameBoard.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (this.gameState.credits >= tool.cost) {
            const defense = document.createElement('div');
            defense.className = 'defense-element';
            defense.innerHTML = tool.icon;
            defense.style.left = `${x - 20}px`;
            defense.style.top = `${y - 20}px`;

            this.gameBoard.appendChild(defense);
            this.activeDefenses.push({
                element: defense,
                type: this.selectedTool,
                x: x,
                y: y,
                range: tool.range
            });

            this.gameState.credits -= tool.cost;
            this.updateUI();
            this.logEvent(`Placed ${this.selectedTool} defense`);

            // Reset selection
            this.selectedTool = null;
            this.toolCards.forEach(card => card.classList.remove('selected'));
        }
    }

    generatePacket() {
        const isAttack = Math.random() < 0.3 + (this.gameState.level * 0.1);
        const y = Math.random() * (this.gameBoard.clientHeight - 10);

        const packet = document.createElement('div');
        packet.className = `packet ${isAttack ? 'attack' : 'normal'}`;
        packet.style.left = '0';
        packet.style.top = `${y}px`;

        this.gameBoard.appendChild(packet);
        this.packets.push({
            element: packet,
            isAttack,
            x: 0,
            y,
            speed: 2 + Math.random() * 2
        });
    }

    updatePackets() {
        for (let i = this.packets.length - 1; i >= 0; i--) {
            const packet = this.packets[i];
            packet.x += packet.speed;
            packet.element.style.transform = `translateX(${packet.x}px)`;

            // Check collision with defenses
            let isBlocked = false;
            if (packet.isAttack) {
                for (const defense of this.activeDefenses) {
                    const dx = packet.x - defense.x;
                    const dy = packet.y - defense.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < defense.range) {
                        const tool = this.defenseTools[defense.type];
                        if (Math.random() < tool.effectiveness) {
                            isBlocked = true;
                            this.gameState.score += 10;
                            break;
                        }
                    }
                }
            }

            // Remove packet if blocked or reached server
            if (isBlocked || packet.x > this.gameBoard.clientWidth - 70) {
                if (!isBlocked && packet.isAttack) {
                    this.gameState.health -= 5;
                } else if (!packet.isAttack) {
                    this.gameState.score += 5;
                }
                packet.element.remove();
                this.packets.splice(i, 1);
            }
        }
    }

    updateGame() {
        if (!this.gameState.isPlaying) return;

        // Generate new packets
        if (Math.random() < 0.05 + (this.gameState.level * 0.01)) {
            this.generatePacket();
        }

        // Update packet positions
        this.updatePackets();

        // Check level progression
        if (this.gameState.score >= this.gameState.level * 1000) {
            this.gameState.level++;
            this.gameState.credits += 200;
            this.logEvent(`Level ${this.gameState.level} reached! Bonus credits awarded.`);
        }

        // Update defense rating
        this.gameState.defenseRating = Math.min(100, 
            Math.floor((this.activeDefenses.length * 20) * 
            (1 - (this.gameState.level * 0.1))));

        // Check game over condition
        if (this.gameState.health <= 0) {
            this.gameOver();
        }

        this.updateUI();
        requestAnimationFrame(() => this.updateGame());
    }

    updateUI() {
        this.scoreValue.textContent = this.gameState.score;
        this.levelValue.textContent = this.gameState.level;
        this.healthValue.textContent = `${this.gameState.health}%`;
        this.creditsValue.textContent = this.gameState.credits;
        this.defenseRating.textContent = `${this.gameState.defenseRating}%`;
    }

    toggleGame() {
        this.gameState.isPlaying = !this.gameState.isPlaying;
        this.startButton.textContent = this.gameState.isPlaying ? 'Pause Game' : 'Resume Game';
        
        if (this.gameState.isPlaying) {
            this.updateGame();
            this.logEvent('Game started');
        } else {
            this.logEvent('Game paused');
        }
    }

    resetGame() {
        this.setupGame();
        this.startButton.textContent = 'Start Defense';
        this.logEvent('Game reset');
    }

    gameOver() {
        this.gameState.isPlaying = false;
        this.startButton.textContent = 'Start Defense';
        this.logEvent(`Game Over! Final Score: ${this.gameState.score}`);
        alert(`Game Over! Your final score is ${this.gameState.score}`);
    }

    logEvent(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = `[${timestamp}] ${message}`;
        this.gameLog.insertBefore(logEntry, this.gameLog.firstChild);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new DefenseGame();
});
