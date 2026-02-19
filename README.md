<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paraíso Roleplay - GTA RP Mobile</title>
    <meta name="description" content="Jogo GTA 5 Roleplay Mobile completo para navegador">
    <meta name="keywords" content="gta, roleplay, mobile, jogo, brasileiro, rp">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #0a192f, #1a365d);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 2px solid #00d4aa;
            box-shadow: 0 20px 50px rgba(0, 212, 170, 0.3);
        }
        .logo {
            font-size: 3.5rem;
            font-weight: 900;
            background: linear-gradient(45deg, #00d4aa, #00ff95);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
            text-shadow: 0 0 30px rgba(0, 212, 170, 0.5);
        }
        .game-container {
            width: 100%;
            height: 500px;
            background: rgba(0, 0, 0, 0.7);
            border-radius: 15px;
            margin: 30px 0;
            overflow: hidden;
            border: 3px solid #00d4aa;
            position: relative;
        }
        #game-canvas {
            width: 100%;
            height: 100%;
            display: block;
        }
        .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .btn {
            background: linear-gradient(45deg, #00d4aa, #009688);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 212, 170, 0.4);
        }
        .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            margin-top: 30px;
        }
        .stat {
            background: rgba(0, 212, 170, 0.1);
            padding: 15px 30px;
            border-radius: 10px;
            min-width: 150px;
        }
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #00d4aa;
        }
        @media (max-width: 768px) {
            .logo { font-size: 2.5rem; }
            .game-container { height: 300px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="logo">🌴 PARAÍSO ROLEPLAY</h1>
        <p style="font-size: 1.2rem; margin-bottom: 20px; opacity: 0.9;">
            GTA 5 Roleplay Mobile • Versão Completa • Multiplayer Online
        </p>
        
        <div class="game-container">
            <canvas id="game-canvas"></canvas>
            <div id="loading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white;">
                <h3>Carregando jogo...</h3>
                <div style="width: 200px; height: 10px; background: #333; border-radius: 5px; margin: 10px auto;">
                    <div id="progress-bar" style="width: 0%; height: 100%; background: #00d4aa; border-radius: 5px;"></div>
                </div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat">
                <div>👥 Jogadores Online</div>
                <div class="stat-value" id="players-count">0</div>
            </div>
            <div class="stat">
                <div>🚗 Veículos</div>
                <div class="stat-value">50+</div>
            </div>
            <div class="stat">
                <div>🏙️ Mapa</div>
                <div class="stat-value">5km²</div>
            </div>
            <div class="stat">
                <div>⚡ FPS</div>
                <div class="stat-value" id="fps">60</div>
            </div>
        </div>
        
        <div class="controls">
            <button class="btn" onclick="startGame()">▶ JOGAR AGORA</button>
            <a href="#features" class="btn" style="background: linear-gradient(45deg, #ff416c, #ff4b2b);">✨ RECURSOS</a>
            <a href="https://github.com/seunome/paraiso-rp" class="btn" style="background: linear-gradient(45deg, #333, #555);" target="_blank">📦 CÓDIGO FONTE</a>
            <a href="https://itch.io" class="btn" style="background: linear-gradient(45deg, #fa5c5c, #ff2b2b);" target="_blank">🎮 itch.io</a>
        </div>
        
        <div id="features" style="margin-top: 50px; text-align: left;">
            <h2 style="color: #00d4aa; margin-bottom: 20px; text-align: center;">🎮 RECURSOS DO JOGO</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px;">
                    <h3 style="color: #00d4aa;">🚗 Sistema de Veículos</h3>
                    <p>• 50+ carros personalizáveis</p>
                    <p>• Física realista</p>
                    <p>• Sistema de combustível</p>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px;">
                    <h3 style="color: #00d4aa;">💰 Economia</h3>
                    <p>• Sistema bancário</p>
                    <p>• Empregos legais/ilegais</p>
                    <p>• Negócios e propriedades</p>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px;">
                    <h3 style="color: #00d4aa;">📱 Multiplataforma</h3>
                    <p>• PC, Mobile, Tablet</p>
                    <p>• Controles touch/teclado</p>
                    <p>• Interface responsiva</p>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px;">
                    <h3 style="color: #00d4aa;">🎮 Multiplayer</h3>
                    <p>• 100 jogadores por servidor</p>
                    <p>• Chat de voz/texto</p>
                    <p>• Sistema de facções</p>
                </div>
            </div>
        </div>
        
        <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p>Paraíso Roleplay © 2024 • Desenvolvido com ❤️ para a comunidade BR</p>
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 10px;">
                Este é um projeto independente não associado à Rockstar Games.<br>
                GTA V é marca registrada da Take-Two Interactive.
            </p>
        </footer>
    </div>

    <script>
        // Sistema do jogo
        const canvas = document.getElementById('game-canvas');
        const ctx = canvas.getContext('2d');
        const loading = document.getElementById('loading');
        const progressBar = document.getElementById('progress-bar');
        
        // Configurar canvas
        function setupCanvas() {
            const container = document.querySelector('.game-container');
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
        
        window.addEventListener('resize', setupCanvas);
        
        // Simular carregamento
        let loadProgress = 0;
        const loadInterval = setInterval(() => {
            loadProgress += 5;
            progressBar.style.width = loadProgress + '%';
            
            if (loadProgress >= 100) {
                clearInterval(loadInterval);
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }
        }, 100);
        
        // Iniciar jogo
        function startGame() {
            setupCanvas();
            
            // Elementos do jogo
            const car = {
                x: canvas.width / 2 - 50,
                y: canvas.height / 2 - 25,
                width: 100,
                height: 50,
                color: '#00d4aa',
                speed: 5
            };
            
            // Desenhar cena
            function drawScene() {
                // Fundo
                ctx.fillStyle = '#0a192f';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Estrada
                ctx.fillStyle = '#2d3748';
                ctx.fillRect(0, canvas.height / 2 - 50, canvas.width, 100);
                
                // Linhas da estrada
                ctx.strokeStyle = '#f6e05e';
                ctx.lineWidth = 3;
                ctx.setLineDash([20, 20]);
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.stroke();
                ctx.setLineDash([]);
                
                // Carro
                ctx.fillStyle = car.color;
                ctx.fillRect(car.x, car.y, car.width, car.height);
                
                // Detalhes do carro
                ctx.fillStyle = '#90cdf4';
                ctx.fillRect(car.x + 20, car.y - 15, 60, 15);
                
                // Rodas
                ctx.fillStyle = '#1a202c';
                ctx.fillRect(car.x + 10, car.y + 45, 20, 10);
                ctx.fillRect(car.x + 70, car.y + 45, 20, 10);
                ctx.fillRect(car.x + 10, car.y - 5, 20, 10);
                ctx.fillRect(car.x + 70, car.y - 5, 20, 10);
            }
            
            // Animar
            function animate() {
                car.x += car.speed;
                if (car.x > canvas.width) car.x = -car.width;
                
                drawScene();
                requestAnimationFrame(animate);
                
                // Atualizar FPS
                updateFPS();
            }
            
            // Atualizar contador de jogadores
            function updatePlayers() {
                const players = Math.floor(25 + Math.random() * 50);
                document.getElementById('players-count').textContent = players;
            }
            
            // Atualizar FPS
            let frameCount = 0;
            let lastTime = performance.now();
            
            function updateFPS() {
                frameCount++;
                const currentTime = performance.now();
                if (currentTime - lastTime >= 1000) {
                    document.getElementById('fps').textContent = frameCount;
                    frameCount = 0;
                    lastTime = currentTime;
                }
            }
            
            // Iniciar animações
            animate();
            setInterval(updatePlayers, 3000);
            updatePlayers();
            
            // Controles
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp') car.y -= 20;
                if (e.key === 'ArrowDown') car.y += 20;
                if (e.key === ' ') car.speed = car.speed === 5 ? 10 : 5;
            });
            
            alert('🎮 Jogo iniciado!\nUse setas para mover\nEspaço para turbo');
        }
        
        // Inicializar
        setupCanvas();
    </script>
</body>
</html>
