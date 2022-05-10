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
				if (err) reject(err);
				exec.start(
					{ hijack: true, stdin: true },
					(err, stream) => {
						if (err) reject(err);
						resolve()
						docker.modem.demuxStream(stream, process.stdout, process.stderr)
					}
				);
			}
		);
	});

module.exports = { dockerCommand };
