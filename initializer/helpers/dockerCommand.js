const { docker } = require("../config/docker");
const dockerCommand = ({ Cmd, gitContainer }) =>
	new Promise(async (resolve, reject) => {
		gitContainer.exec(
			{
				Cmd,
				AttachStdin: true,
				AttachStdout: true,
			},
			(err, exec) => {
				console.log(Cmd);
				if (err) reject(err);
				exec.start({ hijack: true, stdin: true }, (err, stream) => {
					if (err) reject(err);
					docker.modem.demuxStream(stream, process.stdout, process.stderr);
					resolve();
				});
			}
		);
	});

module.exports = { dockerCommand };
