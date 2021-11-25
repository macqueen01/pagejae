import sys
from app import create_app
from flask_twisted import Twisted
from twisted.python import log

if __name__ == '__main__':
    app = create_app()
    Twisted(app)
    log.startLogging(sys.stdout)

    app.logger.info('Starting server...')
    app.run(host='0.0.0.0', port=5000, debug=True)
