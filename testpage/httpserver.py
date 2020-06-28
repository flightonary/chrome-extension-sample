from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse
import os

script_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(script_dir)

address = ('localhost', 8080)

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        print('path = {}'.format(self.path))

        parsed_path = urlparse(self.path)
        print('parsed: path = {}, query = {}'.format(parsed_path.path, parse_qs(parsed_path.query)))

        print('headers\r\n-----\r\n{}-----'.format(self.headers))

        content_length = int(self.headers['content-length'])

        print('body = {}'.format(self.rfile.read(content_length).decode('utf-8')))

        self.send_response(200)
        self.send_header('Content-Type', 'application/plain; charset=utf-8')
        self.end_headers()
        self.wfile.write(b'{"ok":true}')


with HTTPServer(address, MyHTTPRequestHandler) as server:
    server.serve_forever()