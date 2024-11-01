# Ollama Terminal Chat

A beautiful terminal-based chat interface for Ollama with voice synthesis support.

![Terminal Chat Banner](https://i.imgur.com/your-image-here.png)

## Features

- 🎯 Direct integration with Ollama API
- 🎭 Multiple voice synthesis options
- ⌨️ Smooth typing animation
- 🎨 Beautiful terminal UI with colors
- 📝 Natural text wrapping
- ⚡ Fast response times

## Installation Guide for Arch Linux

### 1. Install System Dependencies

```bash
# Install base dependencies
sudo pacman -S nodejs npm git base-devel

# Install audio dependencies
sudo pacman -S festival festival-us espeak-ng sox

# Install additional system libraries
sudo pacman -S alsa-utils pulseaudio-alsa
```

### 2. Install Ollama

```bash
# Install yay AUR helper if you don't have it
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# Install Ollama from AUR
yay -S ollama-bin
```

### 3. Configure Audio

```bash
# Add user to audio group
sudo usermod -a -G audio $USER

# Start audio services
systemctl --user enable --now pipewire pipewire-pulse wireplumber

# Test audio setup
speaker-test -t wav -c 2
```

### 4. Start Ollama Service

```bash
# Start Ollama service
systemctl --user start ollama

# Enable Ollama to start on boot (optional)
systemctl --user enable ollama

# Verify Ollama is running
curl http://localhost:11434/api/tags
```

### 5. Download the LLaMA Model

```bash
# Pull the LLaMA 3.2 1B model
ollama pull llama3.2:1b
```

### 6. Install the Chat Application

```bash
# Clone the repository
git clone https://your-repo-url/ollama-terminal-chat.git
cd ollama-terminal-chat

# Install dependencies
npm install
```

### 7. Run the Application

```bash
# Start the chat
npm start
```

## Usage

### Available Commands

- `voice` - Toggle voice output on/off and select voice
- `voices` - List available voice options
- `help` - Show all available commands
- `exit` - Exit the chat

### Voice Options

The following voices are available:
- Alex (Default male voice)
- Samantha (Default female voice)
- Daniel (British male voice)
- Karen (Australian female voice)
- Moira (Irish female voice)

## Troubleshooting

### Audio Issues

1. Check audio services:
```bash
# Check PipeWire status
systemctl --user status pipewire pipewire-pulse wireplumber

# Restart audio services if needed
systemctl --user restart pipewire pipewire-pulse wireplumber
```

2. Verify audio configuration:
```bash
# Check audio devices
aplay -l
pacmd list-sinks

# Test audio output
espeak "Testing audio output"
```

3. Check permissions:
```bash
# Verify audio group membership
groups $USER

# Fix permissions if needed
sudo usermod -a -G audio $USER
newgrp audio
```

### Ollama Connection Issues

1. Check Ollama service:
```bash
# View service status
systemctl --user status ollama

# Check logs
journalctl --user -u ollama -n 50 --no-pager
```

2. Verify network:
```bash
# Test API endpoint
curl http://localhost:11434/api/tags

# Check port availability
ss -tulpn | grep 11434
```

3. Common fixes:
```bash
# Restart Ollama
systemctl --user restart ollama

# Clear Ollama cache (if needed)
rm -rf ~/.ollama/models
ollama pull llama3.2:1b
```

## Performance Tuning

### System Optimization

1. Adjust process priorities:
```bash
# Run Ollama with higher priority
nice -n -10 ollama serve
```

2. Configure memory limits:
```bash
# Add to ~/.config/systemd/user/ollama.service
[Service]
Environment="OLLAMA_HOST=127.0.0.1"
Environment="OLLAMA_MODELS=/var/lib/ollama/models"
MemoryMax=4G
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project however you'd like.

## Credits

Built with ❤️ using:
- [Ollama](https://ollama.ai)
- [Node.js](https://nodejs.org)
- [say.js](https://github.com/Marak/say.js)
- [chalk](https://github.com/chalk/chalk)
- [inquirer](https://github.com/SBoudrias/Inquirer.js)
- [node-fetch](https://github.com/node-fetch/node-fetch)
- [ora](https://github.com/sindresorhus/ora)